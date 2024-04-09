import { StargateClient, IndexedTx } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const THETA_TESTNET_URL = `https://rpc.sentry-01.theta-testnet.polypore.xyz`;
const THETA_TESTNET_RPC = `ws://rpc.sentry-01.theta-testnet.polypore.xyz:26657`;
const TEST_MNEMONIC = `sustain you panda mom say metal anxiety base slam blossom wheat cream blur tackle night grid knee narrow dust initial exile replace half easy`;

const main = async () => {
  const client = await StargateClient.connect(THETA_TESTNET_RPC);
  const wallet: DirectSecp256k1HdWallet =
    await DirectSecp256k1HdWallet.fromMnemonic(TEST_MNEMONIC);
  const accounts = await wallet.getAccounts();
  const address = accounts[0].address;
  const faucetTx: IndexedTx = (await client.getTx(
    "7623AEEF2CB534438E5F3B2F36F9628EBF971790E92C2EB009C54010C47ED5BE"
  ))!;

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

  process.exit(1);
};

main();
