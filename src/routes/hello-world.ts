import express, { Router } from "express";

import tokenMiddleware from "../middleware/token.middleware";
import helloWorldController from "../controllers/hello-world.controller";

const router: Router = express.Router();

router.use("/hello-world", tokenMiddleware);

router.get("/hello-world", helloWorldController.hello);
router.post("/hello-world/url-encoded", helloWorldController.urlEncoded);

export default router;
