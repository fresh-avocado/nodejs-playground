import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const tokenMiddleware = (req: Request, res: Response, next: any) => {
  // NOTE: una pasada para req y otra para res
  console.log("inspecting header...");
  if (req) {
    console.log("request interceptor");
  } else {
    console.log("response interceptor");
  }
  console.log(req.headers.authorization);

  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const parts = authorizationHeader.split(" ");
    console.log(parts);
    if (parts.length === 2) {
      if (parts[0] !== "Bearer") {
        return res
          .status(404)
          .json({ msg: "Bad format, should be `Bearer ${token}`" });
      } else {
        jwt.verify(parts[1], "llave simétrica", (err, decoded) => {
          if (err) {
            if (err.name == "JsonWebTokenError") {
              // puede ser que haya sido modificado por Trudy
              return res.status(400).json({ msg: "malformed jwt" });
            }
            if (err.name == "NotBeforeError") {
              return res.status(401).json({ msg: "jwt not active yet" });
            }
            if (err.name == "TokenExpiredError") {
              return res.status(401).json({ msg: "token expired" });
            }
          }

          if (decoded?.admin) {
            console.log("admin just logged in!");
          }
          next();
        });
      }
    } else {
      res.status(404).json({ msg: "Bad format, should be `Bearer ${token}`" });
    }
  } else {
    res.status(403).json({ msg: "Must provide an authorization header" });
  }
};

export default tokenMiddleware;
