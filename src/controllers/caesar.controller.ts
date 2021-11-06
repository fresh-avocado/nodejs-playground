import { Request, Response } from "express";

class cesarController {
  constructor() {
    console.log("IMPORTANT: caesar controller instantiated");
  }

  getPossibleValues = (ciphertext: string): string[] => {
    const possibleValues = [];

    let newStr, ascii, newAscii;

    for (let i = 1; i < 26; i++) {
      newStr = "";
      for (let j = 0; j < ciphertext.length; j++) {
        ascii = ciphertext.charCodeAt(j);
        // si no es una letra del alfabeto, dejarla tal cual
        if (ascii < 97 || ascii > 122) {
          newStr += ciphertext[j];
          continue;
        }

        // calcula el nuevo ascii
        newAscii = (ascii + i) % 123;
        if (newAscii < 97) {
          newAscii += 97;
        }

        newStr += String.fromCharCode(newAscii);
      }
      possibleValues.push(newStr);
    }

    return possibleValues;
  };

  decipher = (req: Request, res: Response) => {
    const { text: ciphertext } = req.params;
    console.log(ciphertext);

    const possibleValues = this.getPossibleValues(ciphertext);

    res.status(200).json({ guesses: possibleValues });
  };
}

export default new cesarController();
