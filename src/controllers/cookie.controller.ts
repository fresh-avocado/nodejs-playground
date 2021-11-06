import { Request, Response } from "express";

class cookieController {
  constructor() {}

  addJWTToCookie = (req: Request, res: Response) => {
    // TODO: cambiarlo a un session para poder setear otros metadatos
    console.log("request cookies: ", JSON.stringify(req.cookies, null, 2));
    return res
      .cookie("jwt", "xxxxx.yyyyy.zzzzz", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .end();
  };
}

export default new cookieController();
