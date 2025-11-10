export class EmailError extends Error {
  readonly name = "EmailError";
  constructor(message: string) {
    super(message);
  }
}
export class SMSError extends Error {
  readonly name = "SMSError";
  constructor(message: string) {
    super(message);
  }
}

export class PushNotificationError extends Error {
  readonly name = "PushNotificationError";
  constructor(message: string) {
    super(message);
  }
}
export class WhatsappError extends Error {
  readonly name = "WhatsappError";
  constructor(message: string) {
    super(message);
  }
}
