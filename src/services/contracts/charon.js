import { charonContract } from "./";

export async function getMessageHash(metadata, to, nonce) {
  const hash = await charonContract.methods
    .getMessageHash(metadata, to, nonce)
    .call();
  return hash;
}
