import { Request, Response } from "express";
// necesario hacer `yarn add -D @types/jsonwebtoken` para
// que la línea de abajo funcione
import jwt, { SignOptions } from "jsonwebtoken";

interface AuthComponent {
  login: (req: Request, res: Response) => any;
  register: (req: Request, res: Response) => any;
}

const authController: AuthComponent = {
  login: (req: Request, res: Response) => {
    const body = req.body;

    // TODO: check type of body

    // el payload son datos que pueden ser leidos por todos, pero que no pueden ser
    // modificados
    const payload = { admin: true };
    const secret: string = "llave simétrica";
    const options: SignOptions = {
      algorithm: "HS384",
      expiresIn: 60 * 60, // segundos
    };

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        return res.status(500).json({ msg: "error signing payload" });
      }
      return res.status(200).json({ jwt: token });
    });
  },
  register: (req: Request, res: Response) => {
    // TODO: hacerlo con jwt tmb y con mongo
    return res.status(200).json({ msg: "registered!" });
  },
};

export default authController;
