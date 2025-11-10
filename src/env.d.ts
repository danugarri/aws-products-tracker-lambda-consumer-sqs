declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    SNS_TOPIC_ARN: string;
    REGION: string;
    API_SCRAPER_KEY: string;
    USER_POOL_ID: string;
    QUEUE_URL: string;
    AMAZON_PARTNER_TAG: string;
    SES_FROM_EMAIL: string;
  }
}
