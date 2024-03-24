import { Router } from "express";
import { UserModel } from "./users.model";
import status from "http-status";
import { returnNew } from "../../db";

const router = Router();

router.get("/", async (req, res) => {
  const users = await UserModel.find({});
  res.status(status.OK).json(users);
});

router.post("/", async (req, res) => {
  const newUser = await UserModel.create(req.body);
  res.status(status.CREATED).json(newUser);
});

router.put("/:id", async (req, res) => {
  const updateUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    returnNew
  );
  if (!updateUser) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.status(status.OK).json(updateUser);
});

router.delete("/:id", async (req, res) => {
  const deleteUser = await UserModel.findByIdAndDelete(req.params.id);

  if (!deleteUser) {
    return res.sendStatus(status.NOT_FOUND);
  }
  res.status(status.OK).json(deleteUser);
});

export default ["/api/users", router] as [string, Router];
