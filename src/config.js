const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

const dbName = process.env.DB_NAME || "test.db";

const ethereumNodeWs = process.env.ETHEREUM_NODE_WS || "ws://localhost:8545";

const controllerPrivateKey = process.env.CONTROLLER;

const basePath = process.env.BASE_PATH;

module.exports = {
  port,
  dbName,
  basePath,
  controllerPrivateKey,
  ethereumNodeWs,
};
