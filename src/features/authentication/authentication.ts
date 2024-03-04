import * as dotenv from "dotenv";
import { auth } from 'express-oauth2-jwt-bearer';
dotenv.config();

console.log("AUTH0_DOMAIN", process.env.AUTH0_DOMAIN, "AUTH0_AUDIENCE", process.env.AUTH0_AUDIENCE);

export const checkJwt = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: `${process.env.AUTH0_AUDIENCE}`,
});


