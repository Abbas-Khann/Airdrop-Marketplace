import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { handleGetReward } from "@/utils/contracts/handleStaking";
import { useConfig } from "wagmi";

interface RewardsProps {
  stakedBalance: number;
  userRewards: number;
}

export const Rewards = ({ stakedBalance, userRewards }: RewardsProps) => {
  const config = useConfig();

  const handleClaimRewardsButton = async () => {
    console.log("Claim rewards button clicked");
    // Call the claim rewards function here
    const tx = await handleGetReward({
      amount: userRewards,
      config: config,
    });

    if (tx) {
      // TODO: update states
    }
  };

  return (
    <div className="flex flex-col space-y-2 p-4 text-center">
      <Typography variant="large">Rewards</Typography>
      {/* <Typography variant="smallTitle">Claim your rewards here.</Typography> */}
      <Typography variant="lead" className="py-4">
        {" "}
        Current APR: 13%
      </Typography>
      <div className="flex items-center justify-between">
        <Typography variant="inlineCode" className="pt-4">
          Earned rewards: {userRewards.toFixed(5)} $mMPH
        </Typography>
        <Typography variant="inlineCode" className="pt-4">
          Your Stake: {stakedBalance.toFixed(2)} $mMPH
        </Typography>
      </div>
      <Button variant={"outline"} onClick={handleClaimRewardsButton}>
        Claim Rewards
      </Button>
    </div>
  );
};
