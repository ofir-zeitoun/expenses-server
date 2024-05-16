import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import {
  baseUserSchemaNoId,
  userIdSchema,
  updateUserSchema,
} from "./users.routes-schema";
import { UserModel } from "./user.model";

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

export default ["/api/users", router] as [string, Router];
