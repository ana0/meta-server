import OffContract from "off-contracts/build/contracts/Off.json";
import LifeformsContract from "lifeforms-contracts/build/contracts/Lifeforms2.json";
import WildcardsContract from "wildcards-contracts/build/contracts/Wildcards.json";
import MirrorsContract from "mirror-piece-contracts/build/contracts/MirrorPiece.json";
import MemoryformsContract from "good-death-contracts/artifacts/contracts/Memoryforms.sol/Memoryforms.json";
import CharonContract from "good-death-contracts/artifacts/contracts/Charon.sol/Charon.json";

import { polygonWeb3, ethereumWeb3 } from "../web3";

// Utility methods to get contracts

function getContract(abi, address, network) {
  return new network.eth.Contract(abi, address);
}

export function getOffContract(address) {
  return getContract(OffContract.abi, address, polygonWeb3);
}

export function getLifeformsContract(address) {
  return getContract(LifeformsContract.abi, address, polygonWeb3);
}

export function getWildcardsContract(address) {
  return getContract(WildcardsContract.abi, address, ethereumWeb3);
}

export function getMirrorsContract(address) {
  return getContract(MirrorsContract.abi, address, polygonWeb3);
}

export function getMemoryformsContract(address) {
  return getContract(MemoryformsContract.abi, address, ethereumWeb3);
}

export function getCharonContract(address) {
  return getContract(CharonContract.abi, address, polygonWeb3);
}

export async function isContract(address, network) {
  const code = await network.eth.getCode(address);
  // A valid contract is a string with `0x` as a prefix. If no other characters
  // follow the prefix it is an invalid contract.
  if (/^0x.+/.test(code)) return true;
  return false;
}

export async function isOffContract() {
  return isContract(process.env.OFF_CONTRACT, polygonWeb3);
}

export async function isLifeformsContract() {
  return isContract(process.env.LIFEFORMS_CONTRACT, polygonWeb3);
}

export async function isWildcardssContract() {
  return isContract(process.env.WILDCARDS_CONTRACT, ethereumWeb3);
}

export async function isMirrorsContract() {
  return isContract(process.env.MIRROR_CONTRACT, polygonWeb3);
}

export async function isMemoryformsContract() {
  return isContract(process.env.MEMORYFORMS_CONTRACT, ethereumWeb3);
}

export async function isCharonContract() {
  return isContract(process.env.CHARON_CONTRACT, polygonWeb3);
}

export const offContract = getOffContract(process.env.OFF_CONTRACT);

export const lifeformsContract = getLifeformsContract(
  process.env.LIFEFORMS_CONTRACT
);

export const wildcardsContract = getWildcardsContract(
  process.env.WILDCARDS_CONTRACT
);

export const mirrorsContract = getMirrorsContract(process.env.MIRROR_CONTRACT);

export const memoryformsContract = getMemoryformsContract(process.env.MEMORYFORMS_CONTRACT);

export const charonContract = getCharonContract(process.env.CHARON_CONTRACT);
