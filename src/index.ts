import express from "express";
import cors from "cors";
import { connect } from "./db";
import { routes } from "./routes";
import { env } from "./utils";

const app = express();
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

app.listen(env.port, async () => {
  console.log("Server is running on port :", env.port);
  await connect();
  routes(app);
});
