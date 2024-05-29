import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connect } from "./db";
import { routes } from "./routes";
import { options } from "./swagger";

dotenv.config();

const port = process.env.PORT || 1337;
const app = express();
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(options)
);

app.listen(port, async () => {
  console.log("Server is running on port :", port);
  await connect();
  routes(app);
});
