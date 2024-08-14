import Web3 from "web3";
const {
  //ethereumNodeWs,
  polygonNode,
  ethereumNode,
  offControllerPrivateKey,
  wildcardsControllerPrivateKey,
  memoryformsControllerPrivateKey,
  charonControllerPrivateKey,
} = require("../config");

//export const provider = new Web3.providers.WebsocketProvider(ethereumNodeWs);
export const polygonProvider = new Web3.providers.HttpProvider(polygonNode);

const polygonWeb3 = new Web3(polygonProvider);

export const ethereumProvider = new Web3.providers.HttpProvider(ethereumNode);

const ethereumWeb3 = new Web3(ethereumProvider);

export async function checkConnection() {
  const polygonTop = await polygonWeb3.eth.getBlock("latest");
  const ethereumTop = await ethereumWeb3.eth.getBlock("latest");
  return polygonTop.number && ethereumTop.number;
}

export const offController = polygonWeb3.eth.accounts.privateKeyToAccount(
  offControllerPrivateKey
);

export const wildcardsController = ethereumWeb3.eth.accounts.privateKeyToAccount(
  wildcardsControllerPrivateKey
);

export const memoryformsController = ethereumWeb3.eth.accounts.privateKeyToAccount(
  memoryformsControllerPrivateKey
);

export const charonController = ethereumWeb3.eth.accounts.privateKeyToAccount(
  charonControllerPrivateKey
);

export const { BN } = polygonWeb3.utils;

export { polygonWeb3, ethereumWeb3 };
