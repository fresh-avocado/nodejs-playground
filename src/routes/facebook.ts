import express, { Request, Response, Router } from "express";

const router: express.Router = Router();

router.get("/facebook", (req: Request, res: Response) => {
  return res.redirect("https://facebook.com");
});

export default router;
