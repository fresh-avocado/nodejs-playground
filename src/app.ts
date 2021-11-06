// config imports
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import helloWorldRoutes from "./routes/hello-world";
import testRoutes from "./routes/test-nonce";
import caesarRoutes from "./routes/caesar-cipher";
import mapsRouter from "./routes/maps";
import facebookRouter from "./routes/facebook";
import reactRouter from "./routes/react";
import authRouter from "./routes/auth";
import fileRouter from "./routes/file";
import cookieRouter from "./routes/cookie";

const app = express();

// SECTION: SSR

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine()); // le puedo pasar opciones

// SECTION: no revelar que estamos usando express

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Your Mom");
  next();
});

// SECTION: body parsing

// si el header Content-Type esta seteado a application/json
// entonces este middleware interpreta el body como JSON
// máximo me pueden mandar un JSON
// de tamaño 50 MB
app.use(
  express.json({
    limit: "50mb",
  })
);

// si el header Content-Type esta seteado a application/x-www-form-urlencoded
// entonces este middleware interpreta el body como x-www-form-urlencoded (query string)
// for parsing application/x-www-form-urlencoded
// lo cual es basicamente un query string urlencoded
// en el body, este middleware recive este string feo
// y te crea un objeto bonito que te lo pone
// en el body
app.use(
  express.urlencoded({
    //  The extended option allows to choose between parsing the URL-encoded data
    //  with the querystring library (when `false`) or the qs library (when `true`).
    extended: true,
    limit: "50mb",
  })
);

// for parsing incoming cookies
app.use(cookieParser());

// configuraciones relacionadas a CORS
app.use(
  cors({
    // permitimos requests de todos lados (NO es seguro)
    // opcionalmente le podemos pasar una función que revisa el Origin header
    // del actual request y determina si ese Request tiene permitido
    // hacer Cross Origin requests a este servidor
    origin: "*",
    // qué métodos permite este servidor
    methods: ["GET", "POST"],
    // qué headers el cliente puede mandar luego de su preflight (OPTIONS) request
    // allowedHeaders: []
    // qué headers el servidor le puede devolver a un Cross Origin request
    // exposedHeaders: []
    // está en el notion, la explicación es un poco larga
    // credentials: true,
    // por cuántos segundos el preflight response (Access-Control-Allow-Methods y Access-Control-Allow-Headers)
    // puede estar cached
    maxAge: 3600, // 1 hora
    // pass the CORS preflight response to the next handler
    // no es necesario pasarlo al siguiente handler
    preflightContinue: false,
    // Provides a status code to use for successful OPTIONS requests,
    // since some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,
  })
);

// para servir archivos estáticos (AWS S3 pero mucho más simple)
app.use(express.static(path.join(__dirname, "static")));

// SECTION: ROUTES

app.use("/api", helloWorldRoutes);
app.use("/api", testRoutes);
app.use("/api", caesarRoutes);
app.use("/api", mapsRouter);
app.use("/api", facebookRouter);
app.use("/api", reactRouter);
app.use("/api", authRouter);
app.use("/api", fileRouter);
app.use("/api", cookieRouter);

// SECTION: GRAPHQL

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        msg: String!
    }
`);

const messageResolver = () => {
  return "Hello World!";
};

// Root Resolver
const root = {
  msg: () => {
    return messageResolver();
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // enable interactive tool
  })
);

// TODO: pino logger

// TODO: implementar sesiones con cookies

// TODO: organizar por carpetas para que cada archivo tenga su archivo de unit testing

// TODO: implementar gzip compression como middleware en el router que se encarga de SSR

// TODO: implementar Caching

// TODO: Continuous Integration

// con esto estoy diciendo SOLO exporta 'app'
// si quiero exportar varias cosas, le meto: export.cosa = algo;
export default app;
