const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

const dbName = process.env.DB_NAME || "test.db";

const polygonNodeWs = process.env.POLYGON_NODE_WS || "ws://localhost:8545";

const polygonNode = process.env.POLYGON_NODE || "http://localhost:8545";

const ethereumNodeWs = process.env.ETHEREUM_NODE_WS || "ws://localhost:8545";

const ethereumNode = process.env.ETHEREUM_NODE || "http://localhost:8545";

const offControllerPrivateKey = process.env.OFF_CONTROLLER;

const wildcardsControllerPrivateKey = process.env.WILDCARDS_CONTROLLER;

const mirrorsControllerPrivateKey = process.env.MIRROR_CONTROLLER;

const basePath = process.env.BASE_PATH;

const gravediggerPrivKey = process.env.GRAVEDIGGER_PRIV_KEY;

module.exports = {
  port,
  dbName,
  basePath,
  offControllerPrivateKey,
  wildcardsControllerPrivateKey,
  mirrorsControllerPrivateKey,
  ethereumNodeWs,
  ethereumNode,
  polygonNode,
  polygonNodeWs,
  gravediggerPrivKey,
};
