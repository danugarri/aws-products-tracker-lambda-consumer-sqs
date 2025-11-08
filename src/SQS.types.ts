export type Channel = "EMAIL" | "SMS" | "PUSH_NOTIFICATION" | "WHATSAPP";

export interface ISQSMessage {
  userSub: string;
  productId: string;
  productUrl: string;
  targetPrice: number;
  title: string;
  channel: Channel;
}
