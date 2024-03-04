import { Router, Request, Response } from "express";
import { checkJwt } from "./authentication";
import status from "http-status";


const router = Router();
router.use("/",checkJwt, (req, res) => {
});

export default ["/", router] as [string, Router];
