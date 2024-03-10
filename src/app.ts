import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { routes } from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library
routes(app);

export default app;
