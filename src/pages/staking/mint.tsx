import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useConfig } from "wagmi";
import { handleMorphTokenMint } from "@/utils/contracts/handleMinting";

interface MintProps {
  handleUserBalance: (balance: number) => void;
}

export const Mint = ({ handleUserBalance }: MintProps) => {
  const [mintAmount, setMintAmount] = useState("");
  const account = useAccount();
  const config = useConfig();

  const handleMintButton = async () => {
    if (mintAmount !== "" && account.address) {
      const tx = await handleMorphTokenMint({
        toAddress: account.address,
        amount: Number(mintAmount),
        config: config,
      });

      if (tx) {
        // TODO: toast feedback
        setMintAmount("");
        handleUserBalance(Number(mintAmount));
      }
    }
  };
  return (
    <div className="flex flex-col space-y-2 p-4 text-center">
      <Typography variant="large">Mint Morph Token</Typography>
      <Typography variant="smallTitle">
        Begin your journey by securing Morph tokens. For our testnet phase,
        we're excited to offer a convenient way for you to mint initial tokens.
      </Typography>
      <Input
        placeholder="Amount to mint"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
        className="rounded-xl bg-[#E9E9E9] text-black dark:bg-white/30"
      />
      <Button variant={"outline"} onClick={handleMintButton}>
        Mint Tokens
      </Button>
    </div>
  );
};
