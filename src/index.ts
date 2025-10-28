import type { SQSHandler } from "aws-lambda";
import { processRecord } from "./processRecord";

export const handler: SQSHandler = async (event) => {
  console.log(`Received ${event.Records.length} records`);

  for (const record of event.Records) {
    try {
      await processRecord(record);
    } catch (err) {
      console.error(`Error processing record ${record.messageId}:`, err);
      // Throw to let Lambda fail → triggers SQS retry → DLQ after max receives
      throw err;
    }
  }
};
