import { listAllUsers } from "../cognito/cognitoData";
import { formatMessage } from "./notifier.utils";
import {
  ChannelsMapperType,
  INotifierParams,
  NotificationMethod,
} from "./notifier.types";
import { sendEmail } from "../utils/channels/email";
import DEFAULT from "../utils/channels/default";

const USER_POOL_ID = process.env.USER_POOL_ID!;

export const notifier = async ({ body, currentPrice }: INotifierParams) => {
  const {
    userSub,
    title,
    productUrl,
    productId,
    channel,
    targetPrice,
    imageUrl,
  } = body;

  const timeZone = new Intl.DateTimeFormat().resolvedOptions().locale;
  const formattedDate = new Date().toLocaleString(timeZone);
  console.log({ title });

  const subject = `Good news there is a match for: ${title}`;
  const message = formatMessage({
    title,
    price: currentPrice,
    date: formattedDate,
    productUrl,
    imageUrl,
  });
  console.log({ message });

  const users = await listAllUsers(USER_POOL_ID);

  const channelsMapper: ChannelsMapperType = {
    [NotificationMethod.EMAIL]: sendEmail,
    [NotificationMethod.PUSH_NOTIFICATION]: DEFAULT,
    [NotificationMethod.SMS]: DEFAULT,
    [NotificationMethod.WHATSAPP]: DEFAULT,
  };
  try {
    for (const user of users) {
      if (user.Username === userSub) {
        console.log({ user }, "checking user");
        await channelsMapper[channel]({
          user,
          body: {
            userSub,
            title,
            productUrl,
            productId,
            channel,
            targetPrice,
            imageUrl,
          },
          message,
          subject,
        });
      } else {
        console.log(`User with sub ${userSub} not found in Cognito.`);
        throw new Error(`User with sub ${userSub} not found in Cognito.`);
      }
    }
  } catch (err) {
    console.error(
      `❌ Failed to send Notification for channel: ${channel} and ${productId} for user: ${userSub}`,
      err,
    );
    throw err;
  }
};
