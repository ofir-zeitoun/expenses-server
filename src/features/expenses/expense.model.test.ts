import { describe, it, expect, beforeAll } from "vitest";
import { connect, disconnect } from "../../db";
import { ExpensesModel } from "./expenses.model";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe("Expense Model", () => {
  it("should create a new expense", async () => {
    const expenseData = {
      name: "Test Expense",
      amount: 100,
      cause: "Test",
      date: new Date(),
    };
    const expense = await ExpensesModel.create(expenseData);

    expect(expense).toBeTruthy();
    expect(expense.name).toBe(expenseData.name);
  });
});

describe("Expense Model negative tests", () => {
  it("should not create an expense with invalid data", async () => {
    // Define invalid expense data
    const invalidExpenseData = {
      name: "", // Empty name is invalid
      amount: -100, // Negative amount is invalid
      date: "not-a-valid-date", // Invalid date string
      cause: "Just a test",
    };

    try {
      // Attempt to create an expense with invalid data
      await ExpensesModel.create(invalidExpenseData);
      throw new Error("Should not reach this point");
    } catch (error) {
      // Expect an error to be thrown
      expect(error).toBeDefined();
      // You can also check for specific error messages if your validation logic provides them
      // For example:
      // expect(error.message).toContain('Expense validation failed');
    }
  });
});
