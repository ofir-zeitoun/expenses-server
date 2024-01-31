import { Router, Request, Response } from "express";
import status from "http-status";
import { validateResource } from "../../routes/middlewares";
import { ExpansesModel } from "./expanses.model";
import mongoose, { Schema } from "mongoose";
import { baseExpnenseSchemaNoId } from "./expanses.routes-schema";

export const router = Router();

router.get("/", async (_req, res) => {
  const items = await ExpansesModel.find({});
  res.status(status.OK).json(items);
});


router.post(
  "/",
  validateResource( baseExpnenseSchemaNoId),
  async (req: Request, res: Response) => {
    try {
      const expenseData = { ...req.body, _id: new mongoose.Types.ObjectId() };
      const newExpense = new ExpansesModel(expenseData);
      console.log(newExpense);
      
      await newExpense.save();
      console.log(newExpense);
      res.status(status.CREATED).json(newExpense);
    } catch (error: unknown) {
      console.log(error);
      
      if (error instanceof Error) {
        res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
      } else {
        res.status(status.INTERNAL_SERVER_ERROR).send('An unknown error occurred');
      }
    }
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
