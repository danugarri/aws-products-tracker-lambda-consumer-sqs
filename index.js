// Process single SQS message record
async function processRecord(record) {
  const body = JSON.parse(record.body);
  // body should contain: userId, productId, url, targetPrice (optional)
  const { userId, productId, url, targetPrice: incomingTarget } = body;
  if (!userId || !productId || !url) {
    throw new Error("Invalid message payload");
  }

  // 2) Scrape current price
  const currentPrice = await scrapePrice(url);

  // 3) Compare
  if (currentPrice <= targetPrice) {
    // Check cooldown to avoid duplicate notifications
    const lastNotifiedAt = item.lastNotifiedAt
      ? parseInt(item.lastNotifiedAt.N, 10)
      : 0;
    const now = Math.floor(Date.now() / 1000);
    if (now - lastNotifiedAt >= COOLDOWN) {
      // Publish to SNS
      const message = {
        userId,
        productId,
        url,
        targetPrice,
        currentPrice,
        timestamp: now,
      };
      await sns.send(
        new PublishCommand({
          TopicArn: SNS_TOPIC,
          Message: JSON.stringify(message),
          Subject: `Price alert: ${productId}`,
        })
      );
    }
  }
}

export const handler = async (event) => {
  console.log(`Received ${event.Records.length} records`);
  // Process records sequentially to avoid overloading target site; you can parallelize with caution
  for (const record of event.Records) {
    try {
      await processRecord(record);
      console.log(`Processed message ${record.messageId}`);
    } catch (err) {
      console.error(`Error processing record ${record.messageId}:`, err);
      // Throwing will cause the whole batch to be retried according to the Lambda-SQS behavior.
      // If you want to isolate failed messages, consider returning partial success using onFailure destination or moving poisoned messages to DLQ.
      throw err;
    }
  }
  return {};
};
