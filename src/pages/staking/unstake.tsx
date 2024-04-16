import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleUnstake } from "@/utils/contracts/handleStaking";
import { useConfig } from "wagmi";

interface UnstakeProps {
  setUserStakedAmount: (balance: number) => void;
  setUserBalance: (balance: number) => void;
  userStakedAmount: number;
  walletBalance: number;
}

export const Unstake = ({
  setUserStakedAmount,
  setUserBalance,
  userStakedAmount,
  walletBalance,
}: UnstakeProps) => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const config = useConfig();

  const _handleUnstake = async () => {
    console.log("Unstake button clicked");
    // Call the unstake function here with unstakeAmount
    if (unstakeAmount !== "") {
      const tx = await handleUnstake({
        amount: Number(unstakeAmount),
        config: config,
      });

      if (tx) {
        // TODO: Update the user staked amount and handle the case if user has already a balance
        setUserStakedAmount(0);
        setUserBalance(0);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4 text-center">
      <Typography variant="large">Unstake Your Contribution</Typography>
      <Typography variant="smallTitle">
        Unstake to withdraw your staked tokens.
      </Typography>
      <div className="flex items-center justify-between">
        <Typography variant="inlineCode" className="pt-4">
          Staked Balance: {userStakedAmount}
        </Typography>
        <Typography variant="inlineCode" className="pt-4">
          Current APR: 13%
        </Typography>
      </div>

      <Input
        placeholder="Amount to unstake"
        value={unstakeAmount}
        onChange={(e) => setUnstakeAmount(e.target.value)}
        className="rounded-xl bg-[#E9E9E9] text-black dark:bg-white/30"
      />

      <Button variant={"outline"} onClick={_handleUnstake}>
        Unstake Tokens
      </Button>
    </div>
  );
};
