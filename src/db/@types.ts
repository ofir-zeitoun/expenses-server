import { AuthResult } from "express-oauth2-jwt-bearer";

export type ID = {
  id: string;
};

export type UserAuth = {
  user?: {
    sub?: string;
  };
};

export type AuthRequest = {
  auth?: AuthResult & {
    payload: {
      sub: string;
    };
  };

  userId?: string;
} & UserAuth;
