import { scraper } from "./scraper/apiscraper";
import { ISQSMessage } from "./SQS.types";
import type { Message } from "@aws-sdk/client-sqs";
import { parsePrice } from "./utils/format";
import { notifier } from "./notifier/notifier";

// Process single SQS message record
export async function processRecord(record: Message) {
  const body: ISQSMessage = JSON.parse(record.Body!);
  console.log({ body });
  const urlWithTag = `${body.productUrl}&tag=${process.env.AMAZON_PARTNER_TAG}`;

  // 1) Validate message

  if (!body.userSub || !body.productId || !body.productUrl) {
    throw new Error(`Invalid message payload: ${body}`);
  }

  // 2) Scrape current price
  const { currentPrice } = await scraper(urlWithTag);
  const parsedPrice = parsePrice(currentPrice);
  const isMatch = parsedPrice <= body.targetPrice;

  // 3) Compare
  if (isMatch) {
    await notifier({ body: { ...body, productUrl: urlWithTag }, currentPrice });
  } else {
    console.log(
      `ℹ️ Price not matched for ${body.productId}: target=${body.targetPrice}, current=${parsedPrice}`
    );
  }
}
