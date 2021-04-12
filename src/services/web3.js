import Web3 from "web3";
const { ethereumNodeWs } = require("../config");

export const provider = new Web3.providers.WebsocketProvider(ethereumNodeWs);

const web3 = new Web3(provider);

export async function checkConnection() {
  return (await web3.eth.getBlock("latest")).number;
}

export default web3;
