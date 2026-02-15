import { listAllUsers } from "../cognito/cognitoData";
import { formatMessage } from "./notifier.utils";
import {
  ChannelsMapperType,
  INotifierParams,
  NotificationMethod,
} from "./notifier.types";
import { sendEmail } from "../utils/channels/email";
import DEFAULT from "../utils/channels/default";
import i18n from "../i18n/i18n";

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
    locale,
  } = body;

  const timeZone = new Intl.DateTimeFormat(locale).resolvedOptions().locale;
  const formattedDate = new Date().toLocaleString(timeZone);
  console.log({ title });

  const subject = i18n.t("EMAIL_SUBJECT", { productTitle: title });
  const message = formatMessage({
    title,
    price: currentPrice,
    date: formattedDate,
    productUrl,
    imageUrl,
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
