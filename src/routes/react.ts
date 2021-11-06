import express, { Router } from "express";

import reactController from "../controllers/react.controller";

const router: express.Router = Router();

router.get("/react", reactController.renderReactFromQuery);

export default router;
