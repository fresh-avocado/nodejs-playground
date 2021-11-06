import express, { Router } from "express";
import tokenMiddleware from "../middleware/token.middleware";

import caesarController from "../controllers/caesar.controller";

const router: Router = express.Router();

router.use("/caesar", tokenMiddleware);

router.get("/caesar/:text", caesarController.decipher);

export default router;
