import { wildcardsContract } from "./";

export async function getMessageHash(user, tokenId, nonce) {
  const hash = await wildcardsContract.methods
    .getMessageHash(user, tokenId, nonce)
    .call();
  return hash;
}
