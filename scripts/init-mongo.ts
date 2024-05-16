import * as path from "path";
import { promises as fs } from "fs";
import mongoose, { isValidObjectId } from "mongoose";
import {
  ExpensesListModel,
  ExpensesListDocument,
} from "../src/features/expenses-list/expenses-list.model";
import {
  ExpensesModel,
  Expense,
} from "../src/features/expenses/expenses.model";
import { UserModel } from "../src/features/users/user.model";

const importData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/expanses-01");

    const jsonPath = path.join(__dirname, "mock", "expensesListsMock.json");
    console.log(jsonPath);

    const data = JSON.parse(await fs.readFile(jsonPath, "utf-8"));

    await UserModel.deleteMany();
    await ExpensesModel.deleteMany();
    await ExpensesListModel.deleteMany();

    for (const list of data.expensesList) {
      if (!isValidObjectId((list.creator as any)._id)) {
        console.warn(
          `Invalid ObjectId for creator: ${(list.creator as any)._id}`
        );
        continue;
      }

      let creator = await UserModel.findById((list.creator as any)._id);
      if (!creator) {
        creator = await UserModel.create(list.creator as any);
      }

      const expenses = await Promise.all(
        list.expenses.map(async (expense: { creator: any; _id: any }) => {
          if (!isValidObjectId((expense.creator as any)._id)) {
            console.warn(
              `Invalid ObjectId for expense creator: ${
                (expense.creator as any)._id
              }`
            );
            return null;
          }

          let expenseCreator = await UserModel.findById(
            (expense.creator as any)._id
          );
          if (!expenseCreator) {
            expenseCreator = await UserModel.create(expense.creator as any);
          }

          await ExpensesModel.updateOne(
            { _id: expense._id },
            {
              ...expense,
              creator: expenseCreator._id,
            },
            { upsert: true }
          );

          return expense;
        })
      );

      const validExpenses = expenses.filter((e) => e !== null);

      await ExpensesListModel.create({
        ...list,
        creator: creator._id,
        expenses: validExpenses.map((e) => e?._id),
      });
    }

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
