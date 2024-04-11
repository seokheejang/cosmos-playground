import { StargateClient } from "@cosmjs/stargate";
import { THETA_TESTNET_RPC } from "./config";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";

const main = async () => {
  const client = await StargateClient.connect(THETA_TESTNET_RPC);

  let preBlockNum = 0;
  let newBlockNum = 0;
  for (;;) {
    // const blockNumber = await client.getHeight();
    // console.log("blockNumber", blockNumber);
    const block = await client.getBlock();
    const date = new Date(block.header.time).toISOString().slice(0, -5);
    newBlockNum = block.header.height;

    if (preBlockNum !== newBlockNum) {
      preBlockNum = newBlockNum;
      let txsCnt = block.txs.length;
      const txHashList = [];
      if (txsCnt > 0) {
        for (const tx of block.txs) {
          const txHash = calculateTxHash(tx);
          txHashList.push(txHash);
        }
      }

      console.log(
        `New Block: ${newBlockNum}, Times: ${date}, Tx Count: ${txsCnt}, Txs: ${JSON.stringify(
          txHashList
        )}`
      );
    }

    await sleep(1000);
  }
};

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateTxHash(txRaw: Uint8Array) {
  const txHash = toHex(sha256(txRaw));
  return txHash;
}

function decodedTx(txRaw: Uint8Array) {
  const decodedTx: Tx = Tx.decode(txRaw);
  return decodedTx;
}

main();
