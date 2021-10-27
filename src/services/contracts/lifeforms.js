import { lifeformsContract } from "./";

export const TX_BUY = Symbol("TX_BUY");

export async function getTokenUri(tokenId) {
  return await lifeformsContract.methods.tokenURI(tokenId).call();
}

export async function getSeed(tokenId) {
  return await lifeformsContract.methods.getSeed(tokenId).call();
}

export async function getLifeform(tokenId) {
  const lifeform = await lifeformsContract.methods.getLifeform(tokenId).call();
  return {
    tokenURI: lifeform[0],
    owner: lifeform[1],
    birthtime: lifeform[2],
    ownerBeginning: lifeform[3],
  };
}
