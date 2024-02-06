import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { ExpansesModel } from "./expanses.model";
import mongoose, { Schema } from "mongoose";
import { baseExpensesSchemaNoId } from "./expanses.routes-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await ExpansesModel.find({});
  res.status(status.OK).json(items);
});

router.post(
  "/",
  validateResource(baseExpensesSchemaNoId),
  async (req: Request<{}, {}, { name: string }>, res: Response) => {
    const newExpense = await ExpansesModel.create(req.body);
    res.status(status.CREATED).json(newExpense);
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedExpense = await ExpansesModel.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.sendStatus(status.NOT_FOUND);
    }
    res.status(status.OK).json(deletedExpense);
  } catch (error) {
    console.error(error);
    res.status(status.INTERNAL_SERVER_ERROR).send("An error occurred");
  }
});

export default ["/api/expanses", router] as [string, Router];
