import { scraper } from "./scraper/apiscraper";
import { ISQSMessage } from "./SQS.types";
import type { Message } from "aws-sdk/clients/sqs";
import { parsePrice } from "./utils/format";
import { notifier } from "./notifier/notifier";

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
  const isMatch = parsedPrice <= targetPrice;

  // 3) Compare
  if (isMatch) {
    await notifier({ body, currentPrice });
  } else {
    console.log(
      `ℹ️ Price not matched for ${productId}: target=${targetPrice}, current=${parsedPrice}`
    );
  }
}
