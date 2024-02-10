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

router.delete("/:_id", validateResource(expenseIdSchema), async (req: Request, res: Response) => {
  const deletedExpense = await ExpansesModel.findByIdAndDelete(req.params._id);

  if (!deletedExpense) {
    return res.sendStatus(status.NOT_FOUND);
  }
  res.status(status.OK).json(deletedExpense);
});

export default ["/api/expanses", router] as [string, Router];
