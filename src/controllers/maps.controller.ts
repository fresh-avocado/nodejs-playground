import { Request, Response } from "express";
import child_process from "child_process";
import nanoid from "nanoid";

class mapsController {
  constructor() {}

  saveImageFromURL = (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).json({ msg: "Req should have a body" });
    }

    if (!req.body.url) {
      return res.status(400).json({ msg: "Req body should have a 'url' prop" });
    }

    if (typeof req.body.url !== "string") {
      return res.status(400).json({ msg: "url prop should be a string" });
    }

    // NOTE: sería bueno validar los contenidos del url tmb

    const mapsUrl = req.body.url;

    child_process.exec(
      `curl \"${encodeURI(mapsUrl)}\" 1> ./static/route_${nanoid.nanoid()}.png`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(`error: ${err.message}`);
          return res.status(500).json({ msg: `${stderr}` });
        } else {
          return res
            .status(200)
            .json({ msg: `successfully saved maps image: ${stdout}` });
        }
      }
    );
  };
}

export default new mapsController();
