declare namespace NodeJS {
  export interface ProcessEnv {
    APP_WEB_URL?: string;
    APP_API_URL?: string;
    APP_SECRET?: string;
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    REDIS_PASS?: string;
  }
}
