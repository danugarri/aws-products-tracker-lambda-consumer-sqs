declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    SNS_TOPIC_ARN: string;
    ACCESS_KEY_ID: string;
    SECRET_ACCESS_KEY: string;
    REGION: string;
    API_SCRAPER_KEY: string;
    QUEUE_URL: string;
  }
}
