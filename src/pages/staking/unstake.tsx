import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { handleUnstake } from "@/utils/contracts/handleStaking";
import { useConfig } from "wagmi";

interface UnstakeProps {
  userStakedAmount: number;
  handleUnstakedBalance: (balance: number) => void;
  handleUserBalance: (balance: number) => void;
}

export const Unstake = ({
  handleUserBalance,
  handleUnstakedBalance,

  userStakedAmount,
}: UnstakeProps) => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const config = useConfig();

  const _handleUnstake = async () => {
    if (unstakeAmount !== "") {
      const tx = await handleUnstake({
        amount: Number(unstakeAmount),
        config: config,
      });

      if (tx) {
        // TODO: toast feedback
        handleUserBalance(Number(unstakeAmount));
        handleUnstakedBalance(Number(unstakeAmount));
        setUnstakeAmount("");
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
          Staked Balance: {userStakedAmount} $mMPH
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
