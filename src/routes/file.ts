import express, { Request, Response } from "express";
import path from "path";
import multer, { Multer } from "multer";
import tokenMiddleware from "../middleware/token.middleware";
import fileController from "../controllers/file.controller";

const router: express.Router = express.Router();

router.post("/uploadSingle", tokenMiddleware, fileController.uploadSingleFile);

export default router;
