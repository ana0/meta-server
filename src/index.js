import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import methodOverride from "method-override";

import router from "./routes";
import db from "./database";

//require("./database");
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
const { hostname } = new URL(basePath);

app.use(
  cors({
    origin: [hostname, new RegExp(`.${hostname}`, "i")],
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
        connectSrc: ["'self'", hostname, `*.${hostname}`],
      },
    },
  })
);

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
