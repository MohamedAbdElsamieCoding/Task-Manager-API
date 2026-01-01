declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        password: string;
      };
      id?: string;
    }
  }
}

export {};
