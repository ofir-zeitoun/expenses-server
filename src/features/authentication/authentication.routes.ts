import { Router, Request, Response } from "express";
import { checkJwt } from "../../routes/middlewares/auth0";

const router = Router();
router.use("/", checkJwt, (req, res) => {});

export default ["/", router] as [string, Router];
