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
  const { userSub, title, productUrl, productId, channel, targetPrice } = body;
  const now = Math.floor(Date.now() / 1000);

  const subject = `Good news there is a match for: ${title}`;
  const message = formatMessage({
    title,
    price: currentPrice,
    date: new Date(now * 1000).toLocaleString(),
    productUrl,
  });

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
        await channelsMapper[channel]({
          user,
          body: {
            userSub,
            title,
            productUrl,
            productId,
            channel,
            targetPrice,
          },
          message,
          subject,
        });
      }
    }
  } catch (err) {
    console.error(
      `❌ Failed to send Notification for channel: ${channel} and ${productId} for user: ${userSub}`,
      err
    );
    throw err;
  }
};
