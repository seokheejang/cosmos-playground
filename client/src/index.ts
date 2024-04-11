import { StargateClient, IndexedTx } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { THETA_TESTNET_RPC, TEST_FROM_MNEMONIC } from "./config";

const main = async () => {
  const client = await StargateClient.connect(THETA_TESTNET_RPC);
  const wallet: DirectSecp256k1HdWallet =
    await DirectSecp256k1HdWallet.fromMnemonic(TEST_FROM_MNEMONIC);
  const accounts = await wallet.getAccounts();
  const address = accounts[0].address;
  const faucetTx: IndexedTx = (await client.getTx(
    "7623AEEF2CB534438E5F3B2F36F9628EBF971790E92C2EB009C54010C47ED5BE"
  ))!;
  const decodedTx: Tx = Tx.decode(faucetTx.tx);
  const decodedTxMessage: MsgSend = MsgSend.decode(
    decodedTx.body!.messages[0].value
  );
  const rawLog = JSON.parse(faucetTx.rawLog);

  console.log(
    "With client, chain id:",
    await client.getChainId(),
    ", height:",
    await client.getHeight()
  );
  console.log(
    "Test Address:",
    address,
    ", balance:",
    await client.getAllBalances(address)
  );
  console.log("Faucet Tx:", faucetTx);
  console.log("Decoded Tx:", decodedTx);
  console.log("Decoded Tx Message:", decodedTxMessage);
  console.log("Raw log:", JSON.stringify(rawLog, null, 2));

  process.exit(1);
};

main();
