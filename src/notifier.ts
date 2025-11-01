import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { ISQSMessage } from "./SQS.types";

const REGION = process.env.REGION!;
const SNS_TOPIC = process.env.SNS_TOPIC_ARN;

const sns = new SNSClient({ region: REGION });

export const notifier = async ({
  body,
  currentPrice,
}: {
  body: ISQSMessage;
  currentPrice: string;
}) => {
  const { userSub, productId, productUrl, targetPrice } = body;
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
        Subject: `Good news there is a match for: ${productId}`,
      })
    );
    console.log(`✅ SNS notification sent for ${productId} to ${userSub}`);
  } catch (err) {
    console.error(`❌ Failed to publish SNS for ${productId}:`, err);
    throw err;
  }
};
