import web3 from "../services/web3";

export default async function dispatch(contract, methodName, args, key) {
  const keyObject = web3.eth.accounts.privateKeyToAccount(`0x${key}`);

  const data = contract.methods[methodName](...args).encodeABI();

  const from = keyObject.address;
  const to = contract.options.address;
  const gas = await web3.eth.estimateGas({
    to,
    data,
    from: keyObject.address,
  });
  const txNonce = await web3.eth.getTransactionCount(keyObject.address);

  const signed = await web3.eth.accounts.signTransaction(
    {
      from,
      to,
      data,
      nonce: txNonce,
      gas,
    },
    key
  );

  return web3.eth.sendSignedTransaction(signed.rawTransaction);
}
