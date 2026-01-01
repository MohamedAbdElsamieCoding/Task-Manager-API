declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      PORT: number;
      API_KEY: string;
      MONGO_URL: string;
    }
  }
}

export {};
