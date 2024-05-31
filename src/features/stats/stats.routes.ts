import { Router } from "express";
import { ExpensesModel } from "../expenses/expenses.model";
import { ExpensesListModel } from "../expenses-list/expenses-list.model";
import { UserModel } from "../users/users.model";

export const router = Router();

router.get("/", async (req, res) => {
  try {
    const totalLists = await ExpensesListModel.countDocuments();
    const totalExpenses = await ExpensesModel.countDocuments();
    const totalUsers = await UserModel.countDocuments();
    const totalPriceAggregate = await ExpensesModel.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$price" },
        },
      },
    ]);

    const totalPrice =
      totalPriceAggregate.length > 0 ? totalPriceAggregate[0].totalPrice : 0;

    res.json({
      totalLists,
      totalExpenses,
      totalPrice,
      totalUsers,
    });
  } catch (error) {
    console.error("Failed to retrieve stats:", (error as Error).message);
    res.status(500).send("Internal Server Error");
  }
});

export default ["/api/stats", router] as [string, Router];
