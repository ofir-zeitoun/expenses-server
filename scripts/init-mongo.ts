import mongoose, { isValidObjectId } from "mongoose";
import {
  ExpensesListModel,
  ExpensesList,
} from "../src/features/expenses-list/expenses-list.model";
import {
  ExpensesModel,
  Expense,
} from "../src/features/expenses/expenses.model";
import { UserModel } from "../src/features/users/user.model";
import data from "./mock/expensesListsMock.json";
import * as dotenv from "dotenv";

import {
  ExpensesListSchema,
  JSONExpensesList,
  JSONExpense,
} from "../src/features/expenses-list/expenses-list.routes-schema";
dotenv.config();

const isValidDate = (date: Date) => !isNaN(date.valueOf());

const importData = async () => {
  try {
    const mongodbUri = process.env.DBUri as string;
    if (!mongodbUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(mongodbUri);
    await UserModel.deleteMany();
    await ExpensesModel.deleteMany();
    await ExpensesListModel.deleteMany();

    // Validate data using zod
    const validLists = (data.expensesList as JSONExpensesList[])
      .filter((list) => isValidObjectId(list.creator._id))
      .map((list) => {
        const parsedList = ExpensesListSchema.parse(list);
        const createdAt = new Date(parsedList.createdAt);
        const updatedAt = new Date(parsedList.updatedAt);

        return {
          ...parsedList,
          creator: new mongoose.Types.ObjectId(parsedList.creator._id),
          createdAt: isValidDate(createdAt) ? createdAt : new Date(),
          updatedAt: isValidDate(updatedAt) ? updatedAt : new Date(),
          expenses: parsedList.expenses.map((expense: JSONExpense) => {
            const expenseCreatedAt = new Date(expense.createdAt);
            const expenseUpdatedAt = new Date(expense.updatedAt);

            return {
              ...expense,
              _id: new mongoose.Types.ObjectId(expense._id),
              creator: new mongoose.Types.ObjectId(expense.creator._id),
              createdAt: isValidDate(expenseCreatedAt)
                ? expenseCreatedAt
                : new Date(),
              updatedAt: isValidDate(expenseUpdatedAt)
                ? expenseUpdatedAt
                : new Date(),
            };
          }),
        };
      });

    await Promise.all(
      validLists.map(async (list) => {
        let creator = await UserModel.findById(list.creator);
        if (!creator) {
          creator = await UserModel.findOneAndUpdate(
            { _id: list.creator },
            { _id: list.creator },
            { upsert: true, new: true }
          );
        }

        const expenses = await Promise.all(
          list.expenses.map(async (expense) => {
            if (!isValidObjectId(expense.creator)) {
              console.warn(
                `Invalid ObjectId for expense creator: ${expense.creator}`
              );
              return null;
            }

            let expenseCreator = await UserModel.findById(expense.creator);
            if (!expenseCreator) {
              expenseCreator = await UserModel.findOneAndUpdate(
                { _id: expense.creator },
                { _id: expense.creator },
                { upsert: true, new: true }
              );
            }

            if (!expenseCreator) {
              console.warn(`Expense creator not found: ${expense.creator}`);
              return null;
            }

            await ExpensesModel.updateOne(
              { _id: expense._id },
              {
                ...expense,
                creator: expenseCreator._id,
              },
              { upsert: true }
            );

            return expense._id;
          })
        );

        const validExpenses = expenses.filter((e) => e !== null);

        await ExpensesListModel.updateOne(
          { _id: list._id },
          {
            ...list,
            creator: creator ? creator._id : null,
            expenses: validExpenses as mongoose.Types.ObjectId[],
          },
          { upsert: true }
        );
      })
    );

    console.log("Data Imported!!");
    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);

    await mongoose.connection.db.dropDatabase();
    console.log("Database dropped due to import error.");

    process.exit(1);
  }
};

importData();
