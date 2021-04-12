const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const methodOverride = require("method-override");

const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

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

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
