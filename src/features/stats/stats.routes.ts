import { Router } from "express";
import { ExpensesModel } from "../expenses/expenses.model";
import { ExpensesListModel } from "../expenses-list/expenses-list.model";
import { UserModel } from "../users/users.model";

export const router = Router();

router.get("/", async (req, res) => {
  const [totalLists, totalExpenses, totalUsers, totalPriceAggregate] =
    await Promise.all([
      ExpensesListModel.countDocuments(),
      ExpensesModel.countDocuments(),
      UserModel.countDocuments(),
      ExpensesModel.aggregate([
        {
          $group: {
            _id: null,
            totalPrice: { $sum: "$price" },
          },
        },
      ]),
    ]);

  const totalPrice =
    totalPriceAggregate.length > 0 ? totalPriceAggregate[0].totalPrice : 0;

  res.json({
    totalLists,
    totalExpenses,
    totalPrice,
    totalUsers,
  });
});

export default ["/api/stats", router] as [string, Router];
