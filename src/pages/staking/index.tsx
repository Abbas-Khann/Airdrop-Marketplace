import DashboardLayout from "@/components/dashboard/layout";
import { Typography } from "@/components/ui/typography";
import { Mint } from "./mint";
import { Stake } from "./stake";
import { Unstake } from "./unstake";
import { Rewards } from "./rewards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getUserStakingStats } from "@/utils/contracts/handleStaking";
import { useConfig } from "wagmi";
import {
  getMorphTokenBalance,
  getTotalStakedAmount,
} from "@/utils/contracts/handleToken";

import { useAuth } from "@/context/authContext";

export default function AirdropHunterPage() {
  const { currentUserData } = useAuth();
  const [userWalletBalance, setUserWalletBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState<number>();
  const [totalStakedTokens, setTotalStakedTokens] = useState<number>();
  const [userRewards, setUserRewards] = useState<number>();
  const config = useConfig();

  // TODO: add loading feedback / toast to show success or failure

  useEffect(() => {
    const fetchStakingStats = async () => {
      if (
        currentUserData.current?.ethereumAddress &&
        stakedBalance == undefined
      ) {
        const stats = await getUserStakingStats({
          toAddress: currentUserData.current?.ethereumAddress as `0x${string}`,
          config: config,
        });

        const userBalance = await getMorphTokenBalance({
          toAddress: currentUserData.current?.ethereumAddress as `0x${string}`,
          config: config,
        });

        const stakingContract = await getTotalStakedAmount({
          config: config,
        });

        if (userBalance) {
          setUserWalletBalance(Number(userBalance.morphTokenAmount));
        }
        if (stakingContract) {
          setTotalStakedTokens(Number(stakingContract.totalStakedAmount));
        }
        if (stats) {
          // setUserWalletBalance(stats.walletBalance);
          setStakedBalance(Number(stats.stakedAmount));
          setUserRewards(Number(stats.rewardAmount));
        }
      }
    };
    fetchStakingStats();
  }, []);

  return (
    <DashboardLayout>
      <div className=" space-y-6 py-6 text-center md:space-y-12">
        <Typography variant="h2">
          Stake Morph to Access Airdrop Hunter
        </Typography>
        <Typography variant="smallTitle">
          Airdrop Hunter offers you a gateway to the newest airdrops in the
          cryptocurrency realm.
        </Typography>

        {/* <div className="flex flex-col items-start justify-center ">
          <Typography variant="h3">1. Mint Morph Token</Typography>
          <Typography variant="h3">2. Stake Your Tokens</Typography>
          <Typography variant="h3">3. Access Airdrop Hunter</Typography>
        </div> */}

        <Tabs
          defaultValue="stake"
          className="bg-gradient items-start rounded-xl lg:mx-auto lg:w-9/12"
        >
          <TabsList className="border-1 w-full">
            <TabsTrigger value="mint">Mint</TabsTrigger>
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
          </TabsList>
          <TabsContent value="mint">
            <Mint setUserBalance={setUserWalletBalance} />
          </TabsContent>
          <TabsContent value="stake">
            <Stake
              setUserStakedAmount={setStakedBalance}
              walletBalance={userWalletBalance}
              totalStakedTokens={totalStakedTokens || 0}
            />
          </TabsContent>
          <TabsContent value="rewards">
            <Rewards
              stakedBalance={stakedBalance || 0}
              userRewards={userRewards || 0}
            />
          </TabsContent>

          <TabsContent value="unstake">
            <Unstake
              setUserStakedAmount={setStakedBalance}
              setUserBalance={setUserWalletBalance}
              userStakedAmount={stakedBalance || 0}
              walletBalance={userWalletBalance}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
