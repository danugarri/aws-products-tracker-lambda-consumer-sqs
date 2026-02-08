import { UserType } from "@aws-sdk/client-cognito-identity-provider";
import { ISQSMessage } from "../SQS.types";

export interface IMessageParams {
  title: string;
  price: string;
  date: string;
  productUrl: string;
  imageUrl: string;
}
export interface INotifierParams {
  body: ISQSMessage;
  currentPrice: string;
}
export const NotificationMethod = {
  EMAIL: "EMAIL",
  SMS: "SMS",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  WHATSAPP: "WHATSAPP",
} as const;
export type NotificationMethod =
  (typeof NotificationMethod)[keyof typeof NotificationMethod];

export type ChannelParams = {
  user: UserType;
  subject: string;
  message: string;
  body: Omit<ISQSMessage, "locale">;
};
export type ChannelsMapperType = Record<
  NotificationMethod,
  ({ user, subject, message, body }: ChannelParams) => Promise<void>
>;
