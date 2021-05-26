import web3 from "./services/web3";

const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

const dbName = process.env.DB_NAME || "test.db";

const ethereumNodeWs = process.env.ETHEREUM_NODE_WS || "ws://localhost:8545";

const controller = web3.eth.accounts.privateKeyToAccount(
  process.env.CONTROLLER
);

const basePath = process.env.BASE_PATH;

module.exports = {
  port,
  dbName,
  basePath,
  controller,
  ethereumNodeWs,
};
