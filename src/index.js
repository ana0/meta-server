import path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";

import router from "./routes";
import db from "./database";

const imagesDir = path.join(__dirname, "static");

const { port, basePath } = require("./config");

// Check database connection
db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully");
  })
  .catch(() => {
    console.log("Unable to connect to database");
    process.exit(1);
  });

// Initialize express instance
const app = express();
app.set("port", port);

// Configure view engine
app.set("view engine", "pug");
app.set("views", __dirname);

// Use HTTP middlewares
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());

// Configure CORS
const off = new URL("https://off.supply");
const lifeforms = new URL("https://lifeforms.supply");
//const dev = new URL("http://localhost:3000");

app.use(
  cors({
    origin: [
      off.hostname,
      new RegExp(`.${off.hostname}`, "i"),
      lifeforms.hostname,
      new RegExp(`.${lifeforms.hostname}`, "i"),
      // dev.hostname,
      // new RegExp(`.${dev.hostname}`, "i"),
    ],
    allowedHeaders: [
      "Authorization",
      "Content-Length",
      "Content-Type",
      "Origin",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// Configure HTTP headers / CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        baseUri: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        objectSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        fontSrc: ["'self'"],
        formAction: ["'self'"],
        connectSrc: [
          "'self'",
          off.hostname,
          `*.${off.hostname}`,
          lifeforms.hostname,
          `*.${lifeforms.hostname}`,
        ],
      },
    },
  })
);

app.use("/api/static", express.static(imagesDir));

// Mount all routes
app.use("/api", router);

const server = app.listen(port, async (err) => {
  if (err) console.error(err);
  else console.log(`Server up on ${port}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("closed server");
});
