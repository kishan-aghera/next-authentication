namespace NodeJS {
  interface ProcessEnv {
    MONGO_URL: string;
    TOKEN_SECRET: string;
    DOMAIN: string;
    SMTP_HOST: string;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
    SMTP_PORT: number;
  }
}
