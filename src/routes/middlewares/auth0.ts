import * as dotenv from "dotenv";
import e, { Request, Response, NextFunction, response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { AuthRequest, UserAuth } from "../../db";
import { UserModel } from "../../features/users/users.model";
import status from "http-status";

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
    if (req.auth.payload.aud) {

      // Need to handle to many requests
      fetch(req.auth.payload.aud[1],
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.auth.token}`,
          }
        }

      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
        
          req.user = data;
          next();

        })

    }
  }

};

export const checkUserExists = async (
  req: Request & UserAuth,
  res: Response,
  next: NextFunction
) => {

  if (!req.user) {
    if (!res.headersSent) {
      return res.status(401).json({ message: "User not authenticated." });
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
  }
  else {
    req.userId = user._id;
    console.log("Found existing user");

  }



  if (!res.headersSent) {
    // next(); //TODO fix the bug that using the next() make
  }
};
