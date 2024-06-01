import { Router, Request, Response, NextFunction } from "express";
import status from "http-status";
import { UserRequest } from "../../db/@types";
import { validateResource } from "../../routes/middlewares";
import type { Expense } from "../expenses/expenses.model";
import { UserModel } from "../users/users.model";
import {
  baseExpensesListSchemaNoId,
  paginationSchema,
  queryParamsValidator,
} from "./expenses-list.routes-schema";
import { ExpensesListModel } from "./expenses-list.model";

export const router = Router();

router.get(
  "/",
  validateResource(paginationSchema),
  async (req: UserRequest, res: Response) => {
    const offsetNumber = parseInt(req.query.offset as string);
    const limitNumber = parseInt(req.query.limit as string);

    const lists = await ExpensesListModel.find({})
      .populate("creator")
      .populate({
        path: "expenses",
        populate: {
          path: "creator",
          select: "name photo",
        },
      })
      .sort({ createdAt: req.query.sortOrder === "asc" ? 1 : -1 })
      .skip(offsetNumber)
      .limit(limitNumber);

    const listsWithTotal = lists.map((list) => {
      const totalExpenses = list.expenses.reduce(
        (total: number, expense: Expense) => total + expense.price,
        0
      );

      return {
        ...list.toObject(),
        totalExpenses,
      };
    });

    const totalLists = await ExpensesListModel.countDocuments();

    res.status(status.OK).json({
      offset: offsetNumber,
      limit: limitNumber,
      sortOrder: req.query.sortOrder,
      total: totalLists,
      data: listsWithTotal,
    });
  }
);

router.post(
  "/",
  validateResource(baseExpensesListSchemaNoId),
  async (req: UserRequest, res: Response) => {
    const { name } = req.body;
    const creator = req.user?.sub;

    if (!name || !creator) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: "Name and creator are required." });
    }

    const user = await UserModel.findOne({ auth0Id: creator });

    if (!user) {
      return res.status(status.NOT_FOUND).json({ message: "User not found." });
    }

    const newList = new ExpensesListModel({
      name,
      creator: user._id,
      expenses: [],
      users_ids: [],
    });

    const savedList = await newList.save();
    res.status(status.CREATED).json(savedList);
  }
);

router.delete(
  "/:id",
  validateResource(queryParamsValidator),
  async (req: UserRequest, res: Response) => {
    const { id } = req.params;
    const deletedList = await ExpensesListModel.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(status.NOT_FOUND).json({ message: "List not found" });
    }
    res.status(status.OK).json({ message: "List deleted successfully" });
  }
);

export default ["/api/expenses-list", router] as [string, Router];
