const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const methodOverride = require("method-override");

require("./database");
const { port } = require("./config");

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
const { hostname } = new URL(process.env.BASE_PATH);

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

const server = app.listen(port, async (err) => {
  if (err) console.error(err);
  else console.log(`Server up on ${port}`);
});

process.on("SIGINT", () => {
  server.close();
  console.log("closed server");
});
