import supertest from "supertest";

import app from "../app";

describe("Test the root path of /test", () => {
  test("the GET method should return the string 'a World!'", (done) => {
    supertest(app)
      .get("/api/test")
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res.body).toEqual("a World!");
          return done();
        }
      });
    // tmb puede ser así:
    // .then(res => tests...)
  });
});
