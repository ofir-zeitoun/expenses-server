import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { AuthRequest, UserAuth } from "../../db";
import { UserModel } from "../../features/users/users.model";
dotenv.config();

export const checkJwt = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: `${process.env.AUTH0_AUDIENCE}`,
});

export const extractUserInfo = (
  req: Request & UserAuth,
  _res: Response,
  next: NextFunction
) => {
  if (req.auth) {
    req.user = {
      sub: req.auth.payload.sub,
    };
  }
  next();
};

export const checkUserExists = async (
  req: Request & AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    if (!res.headersSent) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    return;
  }

  const { sub } = req.user;
  const user = await UserModel.findOne({ auth0Id: sub });

  if (!user) {
    if (!res.headersSent) {
      return res
        .status(401)
        .json({ message: "User not found. Please register first." });
    }
    return;
  }

  req.userId = user._id;
  if (!res.headersSent) {
    // next(); //TODO fix the bug that using the next() make
  }
};
