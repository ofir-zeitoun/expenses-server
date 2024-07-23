import { AuthResult } from "express-oauth2-jwt-bearer";

export type ID = {
  id: string;
};

export type UserAuth = {
  user?: {
    sub: string;
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean
  };
  userId?:string;

};



export type AuthRequest = {
  auth?: AuthResult & {
    payload: {
      sub: string;
    };
  };

  userId?: string;
} & UserAuth;
