import { Typography } from "@/components/ui/typography";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleStaking } from "@/utils/contracts/handleStaking";
import { useAccount } from "wagmi";
import { useConfig } from "wagmi";

interface StakeProps {
  setUserStakedAmount: (balance: number) => void;
  walletBalance: number;
}

export const Stake = ({ setUserStakedAmount, walletBalance }: StakeProps) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const account = useAccount();
  const config = useConfig();

  const handleStakeButton = async () => {
    console.log("Stake button clicked");
    // Call the stake function here with stakeAmount
    if (stakeAmount !== "" && account.address) {
      const tx = await handleStaking({
        amount: Number(stakeAmount),
        config: config,
      });

      if (tx) {
        // TODO: Update the user staked amount and handle the case if user has already a balance
        console.log("Staked successfully");
        setStakeAmount("");
        setUserStakedAmount(Number(stakeAmount));
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4 text-center">
      <Typography variant="large">Stake Your Tokens</Typography>
      <Typography variant="smallTitle">
        Staking Morph tokens is your key to unlocking Airdrop Hunter. Stake the
        required amount through our staking interface to gain instant access.
      </Typography>

      <div className="flex items-center justify-between">
        <Typography variant="inlineCode" className="pt-4">
          Your Balance: {walletBalance}
        </Typography>
        <Typography variant="inlineCode" className="pt-4">
          Current APR: 13%
        </Typography>
      </div>
      <Input
        placeholder="Amount to stake"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        className="rounded-xl bg-[#E9E9E9] text-black dark:bg-white/30"
      />
      <Button variant={"outline"} onClick={handleStakeButton}>
        Stake Tokens
      </Button>
    </div>
  );
};
