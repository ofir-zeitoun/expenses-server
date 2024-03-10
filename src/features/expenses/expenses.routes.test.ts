import { describe, it, expect, beforeEach, afterEach } from "vitest";
import supertest from "supertest";
import app from "../../app";
import { connect, disconnect } from "../../db";
import status from "http-status";

describe("Expenses route", () => {
  // Connect to the database before running tests
  beforeEach(async () => {
    await connect();
  });

  // Disconnect from the database after running tests
  afterEach(async () => {
    await disconnect();
  });

  it("should get 200 from get request", async () => {
    await supertest(app).get("/api/expenses").expect(status.OK);
  });

  it("should create a new expense", async () => {
    const newExpense = {
      name: "test",
      amount: 50,
      date: "2024-02-17T18:47:15.944Z",
      cause: "Monthly payment",
    };

    const response = await supertest(app)
      .post("/api/expenses")
      .send(newExpense)
      .expect(status.CREATED); // Status code for successful creation

    // Validate response data
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("date");
    expect(response.body.name).toBe(newExpense.name);
    expect(response.body.amount).toBe(newExpense.amount);
    expect(response.body.cause).toBe(newExpense.cause);
    expect(response.body.date).toBe(newExpense.date);
  });

  it("should return 400 for invalid expense data", async () => {
    const invalidExpense = {
      name: "", // Invalid name
      amount: -10, // Invalid amount
      date: "invalid-date", // Invalid date
      cause: "Test",
    };

    await supertest(app)
      .post("/api/expenses")
      .send(invalidExpense)
      .expect(status.BAD_REQUEST); // Status code for bad request
  });
});
