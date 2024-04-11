import {
  IndexedTx,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import {
  THETA_TESTNET_RPC,
  TEST_FROM_MNEMONIC,
  TEST_TO_MNEMONIC,
} from "./config";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

const main = async () => {
  const getSignerFromMnemonic = async (
    mnemonic: string
  ): Promise<OfflineDirectSigner> => {
    return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: "cosmos",
    });
  };
  const fromSigner: OfflineDirectSigner = await getSignerFromMnemonic(
    TEST_FROM_MNEMONIC
  );
  const toSigner: OfflineDirectSigner = await getSignerFromMnemonic(
    TEST_TO_MNEMONIC
  );
  const fromAccount = (await fromSigner.getAccounts())[0];
  const toAccount = (await toSigner.getAccounts())[0];
  const fromAddress = fromAccount.address;
  const toAddress = toAccount.address;
  const fromSigningClient = await SigningStargateClient.connectWithSigner(
    THETA_TESTNET_RPC,
    fromSigner
  );

  console.log(
    "With from signer client, chain id:",
    await fromSigningClient.getChainId(),
    ", height:",
    await fromSigningClient.getHeight()
  );
  console.log(
    `from Address: ${fromAddress}, balance: ${JSON.stringify(
      await fromSigningClient.getAllBalances(fromAddress)
    )}`
  );
  console.log(
    `to Address: ${toAddress}, balance: ${JSON.stringify(
      await fromSigningClient.getAllBalances(toAddress)
    )}`
  );

  const sendTx = await fromSigningClient.sendTokens(
    fromAddress,
    toAddress,
    [{ denom: "uatom", amount: "10000" }],
    {
      amount: [{ denom: "uatom", amount: "1000" }],
      gas: "200000",
    }
  );
  console.log("sendTx:", sendTx);
  console.log(
    `from Address: ${fromAddress}, balance: ${JSON.stringify(
      await fromSigningClient.getAllBalances(fromAddress)
    )}`
  );
  console.log(
    `to Address: ${toAddress}, balance: ${JSON.stringify(
      await fromSigningClient.getAllBalances(toAddress)
    )}`
  );

  const rawTx: IndexedTx = (await fromSigningClient.getTx(
    sendTx.transactionHash
  ))!;
  const decodedTx: Tx = Tx.decode(rawTx.tx);
  const decodedTxMessage: MsgSend = MsgSend.decode(
    decodedTx.body!.messages[0].value
  );
  console.log("Decoded Tx:", decodedTx);
  console.log("Messages:", JSON.stringify(decodedTx.body!.messages));
  console.log("Decoded Messages:", JSON.stringify(decodedTxMessage, null, 2));

  process.exit(1);
};

main();
