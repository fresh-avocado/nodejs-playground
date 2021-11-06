import express, { Router } from "express";
import cookieController from "../controllers/cookie.controller";

const router: express.Router = Router();

router.get("/cookie", cookieController.addJWTToCookie);

export default router;
