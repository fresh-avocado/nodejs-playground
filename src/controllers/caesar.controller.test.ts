import caesarController from "./caesar.controller";

test("decodes caesar correctly", () => {
  expect(caesarController.getPossibleValues("aa bb zz")).toEqual([
    "bb cc aa",
    "cc dd bb",
    "dd ee cc",
    "ee ff dd",
    "ff gg ee",
    "gg hh ff",
    "hh ii gg",
    "ii jj hh",
    "jj kk ii",
    "kk ll jj",
    "ll mm kk",
    "mm nn ll",
    "nn oo mm",
    "oo pp nn",
    "pp qq oo",
    "qq rr pp",
    "rr ss qq",
    "ss tt rr",
    "tt uu ss",
    "uu vv tt",
    "vv ww uu",
    "ww xx vv",
    "xx yy ww",
    "yy zz xx",
    "zz aa yy",
  ]);
});
