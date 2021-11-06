import { Request, Response } from "express";
import multer from "multer";

import fileService from "../services/file-service";

class fileController {
  constructor() {}

  uploadSingleFile = (req: Request, res: Response) => {
    fileService.uploadSingleFile(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.log(JSON.stringify(err, null, 2));
        return res
          .status(400)
          .json({ msg: `${err.message} ${err.field ? ": " + err.field : ""}` });
      } else if (err) {
        console.log(JSON.stringify(err, null, 2));
        return res.status(500).json({ msg: `${err}` });
      } else {
        console.log("file: ", req.file);
        console.log("body: ", req.body);
        // req.body tiene los keys que son 'text'
        // req.file (o files) tiene los que son tipo 'blob'
        const { name, surname } = req.body;
        console.log("name: ", name);
        console.log("surname: ", surname);

        return res.status(200).json({ msg: "file uploaded successfully" });
      }
    });
  };
}

export default new fileController();
