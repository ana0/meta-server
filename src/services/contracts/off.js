import { offContract } from "./";

export async function getTokenUri(tokenId) {
  return await offContract.methods.tokenURI(tokenId).call();
}

export async function getToken(tokenId) {
  const token = await offContract.methods.getToken(tokenId).call();
  return {
    tokenUri: token[0],
    forSale: token[1],
    secretImageHash: token[2],
    imageHash: token[3],
    owner: token[4],
  };
}

export async function getMessageHash(user, tokenId, issuingTime, nonce) {
  const hash = await offContract.methods
    .getMessageHash(user, tokenId, issuingTime, nonce)
    .call();
  return hash;
}
