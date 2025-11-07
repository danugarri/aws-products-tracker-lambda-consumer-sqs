import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { ISQSMessage } from "../SQS.types";
import { formatMessage } from "./notifier.utils";
import { listAllUsers } from "../cognito/cognitoData";

const REGION = process.env.REGION!;
// const SNS_TOPIC = process.env.SNS_TOPIC_ARN;

// const sns = new SNSClient({ region: REGION });
const ses = new SESClient({ region: REGION });

export const notifier = async ({
  body,
  currentPrice,
}: {
  body: ISQSMessage;
  currentPrice: string;
}) => {
  const { userSub, productId, productUrl } = body;
  const now = Math.floor(Date.now() / 1000);

  const subject = `Good news there is a match for: ${productId}`;
  const message = formatMessage({
    title: productId,
    price: currentPrice,
    date: new Date(now * 1000).toLocaleString(),
    productUrl,
  });
  const USER_POOL_ID = process.env.USER_POOL_ID!;
  const users = await listAllUsers(USER_POOL_ID);
  let userEmail: string | null = null;
  try {
    for (const user of users) {
      if (user.Username === userSub) {
        // 3️⃣ Publish directly to SNS target
        // if (phone) {
        //   await sns.send(
        //     new PublishCommand({
        //       Message: JSON.stringify(message),
        //       PhoneNumber: phone,
        //     })
        //   );
        //   console.log(`📱 SMS sent to ${phone}`);
        // }
        const email = user.Attributes?.find(
          (attribute) => attribute.Name === "email"
        );
        if (email) {
          userEmail = email.Value!;
          await ses.send(
            new SendEmailCommand({
              Source: process.env.SES_FROM_EMAIL!, // must be verified in SES for now my personal email
              Destination: { ToAddresses: [email.Value!] },
              Message: {
                Subject: { Data: subject },
                Body: {
                  Text: { Data: message },
                },
              },
            })
          );
          console.log(`📧 Email sent to ${email}`);
        }
        // We are not using SNS Topic as we cannot dynamically set phone/email there

        console.log(`✅ SES notification sent for ${productId} to ${userSub}`);
      }
    }
  } catch (err) {
    console.error(
      `❌ Failed to publish SES for ${productId} and email-> ${userEmail}:`,
      err
    );
    throw err;
  }
};
