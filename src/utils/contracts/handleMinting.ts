import { getAccount, getPublicClient, getWalletClient } from "wagmi/actions";
import { Config, useConfig } from "wagmi";
import { Morph_Token_ABI, Morph_Token_Address } from "@/constants/contracts";
import { parseEther } from "viem";
// const config = useConfig() to get the config
export const handleMorphTokenMint = async ({
  toAddress,
  amount,
  config,
}: {
  toAddress: `0x${string}`;
  amount: number;
  config: Config;
}) => {
  const { address: account } = getAccount(config);
  const publicClient = getPublicClient(config);
  const walletClient = await getWalletClient(config);
  if (!publicClient) {
    console.log("public client is undefined");
    return;
  }

  if (!walletClient) {
    console.log("wallet client is undefined");
    return;
  }

  try {
    const data = await publicClient.simulateContract({
      account,
      address: Morph_Token_Address,
      abi: Morph_Token_ABI,
      functionName: "mint",
      args: [toAddress, parseEther(amount.toString())],
    });

    const tx = await walletClient.writeContract(data.request);
    console.log("Transaction Sent !");
    const transaction = await publicClient.waitForTransactionReceipt({
      hash: tx,
    });
    console.log("Transaction completed");
    console.log(transaction);
    return transaction;
  } catch (error) {
    console.log(error);
    return error;
  }
};
