import OffContract from "off-contracts/build/contracts/Off.json";

import web3 from "../web3";

// Utility methods to get contracts

function getContract(abi, address) {
  return new web3.eth.Contract(abi, address);
}

export function getOffContract(address) {
  return getContract(OffContract.abi, address);
}

export async function isContract(address) {
  const code = await web3.eth.getCode(address);
  // A valid contract is a string with `0x` as a prefix. If no other characters
  // follow the prefix it is an invalid contract.
  if (/^0x.+/.test(code)) return true;
  return false;
}

export async function isOffContract() {
  return isContract(process.env.REACT_APP_OFF_CONTRACT);
}

export const offContract = getOffContract(process.env.REACT_APP_OFF_CONTRACT);
