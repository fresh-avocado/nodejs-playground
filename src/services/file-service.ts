import { Request } from "express";
import multer from "multer";
import path from "path";

// `MemoryStorage` los guarda en RAM (últil cuando son archivos bien grandes, porque es más grande)
// pero podría comer toda la memoria del sistema
const storage = multer.diskStorage({
  // string or function that determines the destination path for uploaded files
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    // acá estoy guardandolo solo en static, pero se podrían hacer cosas más interesantes con esto
    callback(null, path.join(__dirname, "../static/"));
  },
  // A function that determines the name of the uploaded file. If nothing
  // is passed, Multer will generate a 32 character pseudorandom hex string
  // with no extension.
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) => {
    // acá tmb estoy poniendole un nombre simple pero podría hacer cosas más interesantes
    callback(null, `uploaded_file_${file.originalname}`);
  },
});

// const multerOptions = {
//   dest: path.join(__dirname, "../static/"),
// };
const multerOptions: multer.Options = {
  storage: storage,
};

// "file" es el nombre del key en el form data que tendrá al archivo
// si no tiene ese nombre, multer botará un error
const uploadSingleFile = multer(multerOptions).single("file");

const fileService = {
  uploadSingleFile: uploadSingleFile,
};

export default fileService;
