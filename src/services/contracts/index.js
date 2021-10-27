import OffContract from "off-contracts/build/contracts/Off.json";
import LifeformsContract from "lifeforms-contracts/build/contracts/Lifeforms2.json";

import web3 from "../web3";

// Utility methods to get contracts

function getContract(abi, address) {
  return new web3.eth.Contract(abi, address);
}

export function getOffContract(address) {
  return getContract(OffContract.abi, address);
}

export function getLifeformsContract(address) {
  return getContract(LifeformsContract.abi, address);
}

export async function isContract(address) {
  const code = await web3.eth.getCode(address);
  // A valid contract is a string with `0x` as a prefix. If no other characters
  // follow the prefix it is an invalid contract.
  if (/^0x.+/.test(code)) return true;
  return false;
}

export async function isOffContract() {
  return isContract(process.env.OFF_CONTRACT);
}

export async function isLifeformsContract() {
  return isContract(process.env.LIFEFORMS_CONTRACT);
}

export const offContract = getOffContract(process.env.OFF_CONTRACT);

export const lifeformsContract = getLifeformsContract(
  process.env.LIFEFORMS_CONTRACT
);
