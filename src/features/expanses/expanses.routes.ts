import { Router, Request, Response } from "express";
import status from "http-status";
import { returnNew } from "../../db";
import { validateResource } from "../../routes/middlewares";
import { ExpansesModel } from "./expanses.model";
import { expenseIdSchema } from "./expanses.routes-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await ExpansesModel.find({});
  res.status(status.OK).json(items);
});

router.get("/:_id", validateResource(expenseIdSchema), async (req: Request, res: Response) => {
  const item = await ExpansesModel.findById(req.params._id);

  if (!item) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.status(status.OK).json(item);
});

export default ["/api/expanses", router] as [string, Router];
