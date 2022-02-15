const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

const dbName = process.env.DB_NAME || "test.db";

const ethereumNodeWs = process.env.ETHEREUM_NODE_WS || "ws://localhost:8545";

const ethereumNode = process.env.ETHEREUM_NODE || "http://localhost:8545";

const controllerPrivateKey = process.env.CONTROLLER;

const basePath = process.env.BASE_PATH;

const gravediggerPrivKey = process.env.GRAVEDIGGER_PRIV_KEY;

module.exports = {
  port,
  dbName,
  basePath,
  controllerPrivateKey,
  ethereumNodeWs,
  ethereumNode,
  gravediggerPrivKey,
};
