import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { EmailError } from "../errors/instances";
import { ChannelParams } from "../../notifier/notifier.types";

const REGION = process.env.REGION!;
const ses = new SESClient({ region: REGION });

export const sendEmail = async ({
  user,
  subject,
  message,
  body,
}: ChannelParams) => {
  let userEmail: string | null = null;

  try {
    const email = user.Attributes?.find(
      (attribute) => attribute.Name === "email",
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
              Html: { Data: message },
            },
          },
        }),
      );
      console.log(`📧 Email sent to ${email.Value}`);
    }
    // We are not using SNS Topic as we cannot dynamically set phone/email there

    console.log(
      `✅ SES notification sent for ${body.productId} to ${body.userSub}`,
    );
  } catch (error) {
    console.error(
      `❌ Failed to publish SES for ${body.productId} and email-> ${userEmail}:`,
      error,
    );
    throw new EmailError((error as Error).message);
  }
};
