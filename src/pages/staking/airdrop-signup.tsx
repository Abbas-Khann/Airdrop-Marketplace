import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handleMorphTokenMint } from "@/utils/contracts/handleMinting";
import { handleStaking } from "@/utils/contracts/handleStaking";
import { handleUnstake } from "@/utils/contracts/handleStaking";
import { useAccount } from "wagmi";
import { useConfig } from "wagmi";

export default function AirdropsSignup() {
  const [mintAmount, setMintAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [userStakedAmount, setUserStakedAmount] = useState(0); // This should be fetched from the contract [TODO]
  const [userMorphBalance, setUserMorphBalance] = useState(0); // This should be fetched from the contract [TODO]
  const account = useAccount();

  const handleMintButton = async () => {
    console.log("Mint button clicked");
    // Call the mint function here with mintAmount
    if (mintAmount !== "" && account.address) {
      const tx = await handleMorphTokenMint({
        toAddress: account.address,
        amount: Number(mintAmount),
        config: useConfig(),
      });

      if (tx) {
        console.log("Minted successfully");
        setMintAmount("");
        setUserMorphBalance(Number(mintAmount));
      }
    }
  };

  const handleStakeButton = async () => {
    console.log("Stake button clicked");
    // Call the stake function here with stakeAmount
    if (stakeAmount !== "" && account.address) {
      const tx = await handleStaking({
        amount: Number(stakeAmount),
        config: useConfig(),
      });

      if (tx) {
        console.log("Staked successfully");
        setStakeAmount("");
        setUserStakedAmount(Number(stakeAmount));
      }
    }
  };

  // TODO: Implement the handleUnstakeButton function
  // When the user has balance we should render components to allow the user to unstake

  const handleUnstakeButton = async () => {
    console.log("Unstake button clicked");
    // Call the unstake function here
    if (stakeAmount !== "" && account.address) {
      handleUnstake({
        amount: Number(stakeAmount),
        config: useConfig(),
      });
    }
  };

  return (
    <>
      <div className=" space-y-6 py-6 md:space-y-12">
        <Typography variant="h2">Gain Access to Airdrop Hunter</Typography>
        <Typography variant="smallTitle">
          Airdrop Hunter offers you a gateway to the newest airdrops in the
          cryptocurrency realm. Follow these steps to unlock full access.
        </Typography>

        <div className="flex flex-wrap items-center justify-normal gap-4 md:w-full md:flex-row">
          <div className="flex flex-col items-start justify-center">
            <Typography variant="h3">Step 1: Obtain Morph Token</Typography>
            <Typography variant="smallTitle">
              Begin your journey by securing Morph tokens. For our testnet
              phase, we're excited to offer a convenient way for you to mint
              initial tokens.
            </Typography>
          </div>

          <div className="flex flex-col items-start justify-center">
            <Typography variant="h3">Step 2: Minting for Testnet</Typography>
            <Typography variant="smallTitle">
              Access our exclusive testnet contract to mint your Morph tokens.
              Simply connect your wallet and mint the amount you need to get
              started.
            </Typography>

            <div className="mt-4 flex items-center justify-center gap-4">
              <Label className="space-y-2">
                <Input
                  placeholder="Amount of tokens to mint"
                  className="rounded-xl p-4 dark:bg-white dark:text-black"
                  type="number"
                  value={mintAmount}
                  onChange={(e) => {
                    setMintAmount(e.target.value);
                  }}
                />
              </Label>

              <Button
                className="rounded-xl dark:bg-black dark:text-white dark:hover:bg-black/80"
                onClick={handleMintButton}
              >
                Mint
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <Typography variant="h3">Step 3: Stake Your Tokens</Typography>
            <Typography variant="smallTitle">
              Staking Morph tokens is your key to unlocking Airdrop Hunter.
              Stake the required amount through our staking interface to gain
              instant access.
            </Typography>

            <div className="mt-4 flex items-center justify-center gap-4">
              <Label className="space-y-2">
                <Input
                  placeholder="Amount of tokens to stake"
                  type="number"
                  value={stakeAmount}
                  className="rounded-xl p-4 dark:bg-white dark:text-black"
                  onChange={(e) => {
                    setStakeAmount(e.target.value);
                  }}
                />
              </Label>

              <Button
                className="rounded-xl dark:bg-black dark:text-white dark:hover:bg-black/80"
                onClick={handleStakeButton}
              >
                Stake
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <Typography variant="h3">Step 4: Access Airdrop Hunter</Typography>
            <Typography variant="smallTitle">
              Congratulations! You've successfully staked your Morph tokens. You
              now have full access to Airdrop Hunter. Refresh the page to see
              the airdrops available for you.
            </Typography>

            <Button
              className="mt-4 rounded-xl dark:bg-black dark:text-white dark:hover:bg-black/80"
              onClick={() => {
                console.log("Refresh the page");
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
