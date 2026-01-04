import { IAuth } from "./auth";
declare global {
  namespace Express {
    interface Request {
      user?: IAuth;
      id?: string;
    }
  }
}

export {};
