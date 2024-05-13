import { memoryformsContract } from "./";

export async function getTokenUri(tokenId) {
  return await memoryformsContract.methods.tokenURI(tokenId).call();
}

export async function getToken(tokenId) {
  const token = await memoryformsContract.methods.getToken(tokenId).call();
  return token;
}

export async function getMessageHash(metadata, nonce) {
  const hash = await memoryformsContract.methods
    .getMessageHash(metadata, nonce)
    .call();
  return hash;
}
