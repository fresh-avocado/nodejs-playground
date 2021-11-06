import { Request, Response } from "express";

interface HelloWorldController {
  hello: (req: Request, res: Response) => any;
  urlEncoded: (req: Request, res: Response) => any;
}

const helloWorldController: HelloWorldController = {
  hello: (req: Request, res: Response) => {
    console.log("body: ", req.body);
    return res.status(200).json("Hello World!");
  },
  urlEncoded: (req: Request, res: Response) => {
    console.log("req.query", req.body);
    return res.status(200).json({ msg: req.body });
  },
};

export default helloWorldController;
