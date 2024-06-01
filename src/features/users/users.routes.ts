import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew, UserRequest } from "../../db";
import { validateResource } from "../../routes/middlewares";
import {
  baseUserSchemaNoId,
  userIdSchema,
  updateUserSchema,
} from "./users.routes-schema";
import { UserModel } from "./users.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(status.OK).json(users);
});

router.post(
  "/",
  validateResource(baseUserSchemaNoId),
  async (req: Request, res: Response) => {
    const newUser = await UserModel.create(req.body);
    res.status(status.CREATED).json(newUser);
  }
);

router.put(
  "/:id",
  validateResource(updateUserSchema),
  async (req: Request, res: Response) => {
    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      returnNew
    );
    if (!updateUser) {
      return res.sendStatus(status.NOT_FOUND);
    }

    res.status(status.OK).json(updateUser);
  }
);

router.delete(
  "/:id",
  validateResource(userIdSchema),
  async (req: Request, res: Response) => {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.sendStatus(status.NOT_FOUND);
    }
    res.status(status.OK).json(deleteUser);
  }
);
router.get("/check", async (req: UserRequest, res: Response) => {
  const auth0Id = req.user?.sub;

  const user = await UserModel.findOne({ auth0Id });

  if (user) {
    return res.status(status.OK).json({ exists: true, user });
  } else {
    return res.status(status.OK).json({ exists: false, auth0Id });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const { auth0Id, name, phone, email, picture } = req.body;

  const existingUser = await UserModel.findOne({ auth0Id });
  if (existingUser) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: "User already exists" });
  }

  const newUser = new UserModel({
    auth0Id,
    name,
    phone,
    email,
    photo: picture,
  });
  await newUser.save();

  res.status(status.CREATED).json(newUser);
});

export default ["/api/users", router] as [string, Router];
