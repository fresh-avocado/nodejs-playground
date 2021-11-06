import express, { Router } from "express";

import mapsController from "../controllers/maps.controller";
import tokenMiddleware from "../middleware/token.middleware";

const router: Router = express.Router();

router.use("/maps", tokenMiddleware);

router.post("/maps", mapsController.saveImageFromURL);

export default router;
