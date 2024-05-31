import { AuthResult } from "express-oauth2-jwt-bearer";
import { Request } from "express";

export type ID = {
  id: string;
};

export interface UserRequest extends Request {
  user?: {
    sub: string;
  };
}

export interface AuthRequest extends Request {
  auth?: AuthResult & {
    payload: {
      sub: string;
    };
  };
  user?: {
    sub: string;
  };
  userId?: string;
}
