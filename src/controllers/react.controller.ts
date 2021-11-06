import { Request, Response } from "express";

class reactController {
  constructor() {}

  renderReactFromQuery = (req: Request, res: Response) => {
    const { name, surname, age } = req.query;
    console.log(name, surname, age);
    // TODO: hacer que funcione con `.tsx`
    return res.render("index", { name, surname, age });
  };
}

export default new reactController();
