import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface UnstakeProps {
  setUserStakedAmount: (balance: number) => void;
  setUserBalance: (balance: number) => void;
  userStakedAmount: number;
}

export const Unstake = ({
  setUserStakedAmount,
  setUserBalance,
  userStakedAmount,
}: UnstakeProps) => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const handleUnstake = () => {
    console.log("Unstake", unstakeAmount);
    setUnstakeAmount(""); // Reset the input field after unstake
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

      <Button variant={"outline"} onClick={handleUnstake}>
        Unstake Tokens
      </Button>
    </div>
  );
};
