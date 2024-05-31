import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./db";
import { routes } from "./routes";
dotenv.config();

const port = process.env.PORT || 1337;
const app = express();
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

app.listen(port, async () => {
  console.log("Server is running on port :", port);
  await connect();
  routes(app);
});
