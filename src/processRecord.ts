import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { scraper } from "./scraper/apiscraper";
import { ISQSMessage } from "./SQS.types";
import type { Message } from "aws-sdk/clients/sqs";
import { parsePrice } from "./utils/format";

const REGION = process.env.REGION!;
const SNS_TOPIC = process.env.SNS_TOPIC_ARN;

const sns = new SNSClient({ region: REGION });

// Process single SQS message record
export async function processRecord(record: Message) {
  const body: ISQSMessage = JSON.parse(record.Body!);
  console.log({ body });

  // 1) Validate message

  const { userSub, productId, productUrl, targetPrice } = body;
  if (!userSub || !productId || !productUrl) {
    throw new Error(`Invalid message payload: ${record.Body}`);
  }

  // 2) Scrape current price
  const { currentPrice } = await scraper(productUrl);
  const parsedPrice = parsePrice(currentPrice);

  // 3) Compare
  if (parsedPrice <= targetPrice) {
    const now = Math.floor(Date.now() / 1000);
    // Publish to SNS
    const message = {
      userSub,
      productId,
      productUrl,
      targetPrice,
      currentPrice,
      timestamp: now,
    };

    try {
      await sns.send(
        new PublishCommand({
          TopicArn: SNS_TOPIC,
          Message: JSON.stringify(message),
          Subject: `Price alert: ${productId}`,
        })
      );
      console.log(`✅ SNS notification sent for ${productId} to ${userSub}`);
    } catch (err) {
      console.error(`❌ Failed to publish SNS for ${productId}:`, err);
      // Throwing error triggers Lambda retry (so SQS retries the message)
      throw err;
    }
  } else {
    console.log(
      `ℹ️ Price not matched for ${productId}: target=${targetPrice}, current=${parsedPrice}`
    );
  }
}
