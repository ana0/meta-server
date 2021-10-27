import Web3 from "web3";
const {
  //ethereumNodeWs,
  ethereumNode,
  controllerPrivateKey,
} = require("../config");

//export const provider = new Web3.providers.WebsocketProvider(ethereumNodeWs);
export const provider = new Web3.providers.HttpProvider(ethereumNode);

const web3 = new Web3(provider);

export async function checkConnection() {
  return (await web3.eth.getBlock("latest")).number;
}

export const controller = web3.eth.accounts.privateKeyToAccount(
  controllerPrivateKey
);

export const { BN } = web3.utils;

export default web3;
