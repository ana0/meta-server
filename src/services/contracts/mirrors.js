import { mirrorsContract } from "./";

export async function mint(user, mintcode) {
  await mirrorsContract.methods.mint(user, mintcode).send();
}

export async function checkMintcode(hashedMintcode) {
  return mirrorsContract.methods.mintcodes(hashedMintcode).call();
}
