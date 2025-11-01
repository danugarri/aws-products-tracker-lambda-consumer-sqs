import AWS from "aws-sdk";
import { processRecord } from "./processRecord";

// Configure AWS SDK
const sqs = new AWS.SQS({ region: process.env.REGION });
const QUEUE_URL = process.env.QUEUE_URL!;

if (!QUEUE_URL) {
  console.error("Error: QUEUE_URL environment variable is not set.");
  process.exit(1);
}

// Optional: tuning parameters via env variables
const MAX_MESSAGES = parseInt(process.env.MAX_MESSAGES || "10", 10);
const WAIT_TIME = parseInt(process.env.WAIT_TIME || "20", 10); // long polling
const ERROR_BACKOFF = parseInt(process.env.ERROR_BACKOFF || "5000", 10); // ms

export async function pollQueue() {
  console.log("Starting SQS polling...");

  while (true) {
    try {
      const data = await sqs
        .receiveMessage({
          QueueUrl: QUEUE_URL,
          MaxNumberOfMessages: MAX_MESSAGES,
          WaitTimeSeconds: WAIT_TIME,
        })
        .promise();

      if (!data.Messages || data.Messages.length === 0) {
        continue; // no messages, poll again
      }

      for (const message of data.Messages) {
        try {
          await processRecord(message as AWS.SQS.Message); // your existing record processing
          await sqs
            .deleteMessage({
              QueueUrl: QUEUE_URL,
              ReceiptHandle: message.ReceiptHandle!,
            })
            .promise();
          console.log(`Processed and deleted message ${message.MessageId}`);
        } catch (err) {
          console.error(`Error processing message ${message.MessageId}:`, err);
          // Do not delete → SQS will retry or DLQ will handle it
        }
      }
    } catch (err) {
      console.error("Error polling SQS:", err);
      // Avoid hot-looping on errors
      await new Promise((r) => setTimeout(r, ERROR_BACKOFF));
    }
  }
}
