import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import status from "http-status";
import { UserAuth } from "../../db";
import { UserModel } from "../../features/users/users.model";
import { env, memoize } from "../../utils";

dotenv.config();

const checkJwt = auth({
  issuerBaseURL: `https://${env.Auth0Domain}`,
  audience: `${env.Auth0Audience}`,
});

export const authenticate = (req: Request, res: Response, next: NextFunction) =>
  checkJwt(req, res, () => {
    if (req.auth) {
      return next();
    }
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "User not authenticated." });
  });
const userProfileUrlIndex = 1;

const fetchUserInfo = async (url: string, token: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await response.json();
  return user;
};

const memoFetchUserInfo = memoize(fetchUserInfo);

export const extractUserInfo = (
  req: Request & UserAuth,
  _res: Response,
  next: NextFunction
) => {
  const userProfileUrl = req.auth?.payload.aud?.[userProfileUrlIndex];
  const token = req.auth?.token;

  if (!userProfileUrl || !token) {
    return; //do we need next or return ?
  }
  (async () => {
    req.user = await memoFetchUserInfo(userProfileUrl, token);
    await next();
  })();
};

export const checkUserExists = async (
  req: Request & UserAuth,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    if (!res.headersSent) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: "User not authenticated." });
    }
    return;
  }
  const { sub, name, email, picture } = req.user;
  const user = await UserModel.findOne({ auth0Id: sub });

  if (!user) {
    const newUser = new UserModel({
      auth0Id: sub,
      name,
      email,
      photo: picture,
    });
    await newUser.save();
    req.userId = newUser._id;
    console.log("Created New user");
  } else {
    req.userId = user._id;
    console.log("Found existing user");
  }

  if (!res.headersSent) {
    // next(); //TODO fix the bug that using the next() make
  }
};
