import { Request, Response } from "express";

const testController = {
  test: (req: Request, res: Response) => {
    console.log("got a request from: ", req.hostname);
    return res.status(200).json("a World!");
  },
  refreshPage: (req: Request, res: Response) => {
    res.setHeader("clear-site-data", "executionContexts");
  },
};

export default testController;
