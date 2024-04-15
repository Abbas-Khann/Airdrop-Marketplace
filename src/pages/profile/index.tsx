import DashboardCard from "@/components/dashboard/dashboard-card";
import Image from "next/image";
import pfp from "@/assets/dashboard/pfp.svg";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { EyeOff, PenIcon, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/layout";
import profile from "@/assets/dashboard/profile.svg";
import profileDark from "@/assets/dashboard/profile-dark.svg";
import { useAccount } from "wagmi";
import { useAuth } from "@/context/authContext";
import { format } from "date-fns";

export default function ProfilePage() {
  const { address } = useAccount();
  const { currentUserData, authorized } = useAuth();

  console.log(authorized);

  const user = currentUserData?.current;

  console.log(user);

  const userTasks = user?.UserTasks?.length;
  const walletAddress = user?.ethereumAddress;
  const userRewards = user?.UserRewards;
  const formatDate = (date: Date) => format(new Date(date), "PPP");
  const completedTasks =
    user?.UserTasks?.filter((task) => task.completed).length || 0;
  const totalInteractions = user?.interactions?.length || 0;
  const favouriteProjects =
    user?.UserProjects?.filter((project) => project.favourite).length || 0;
  const inviteCode = user?.inviteCode;
  const earnedRewards = userRewards?.reduce(
    (acc, reward) => acc + reward.points,
    0,
  );

  console.log(userTasks);

  // if (!isLoggedIn) we display a message to log in
  // if (isLoading) we display a loading indicator
  // if (user) we display the user data

  return (
    <DashboardLayout>
      {/* {isLoggedIn && <div>{user?.address}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoggedIn && address && <div>Not logged in</div>} */}

      {currentUserData.current ? (
        <div className="space-y-6 px-1 py-2 md:space-y-12 md:px-0 md:py-6">
          <Typography variant={"h2"} className=" font-raleway">
            Profile
          </Typography>
          <DashboardCard className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <Image src={pfp} alt="pfp" className="" />
              <div className="space-y-6 text-center md:text-start">
                <div className="space-y-2">
                  <Typography variant={"h4"} className="block tracking-wide">
                    Address / Username
                  </Typography>
                  <Typography
                    variant={"smallTitle"}
                    className="block tracking-wide"
                  >
                    {walletAddress}
                  </Typography>
                </div>
                <Typography
                  variant={"smallTitle"}
                  className="block text-neutral-500"
                >
                  Joined at {user?.createdAt && formatDate(user.createdAt)}
                </Typography>
              </div>
            </div>
            <Button
              variant={"outline"}
              className="flex w-full items-center gap-2 rounded-xl border-0 bg-[#00000021] hover:bg-[#00000016] dark:bg-[#FFFFFF21] dark:hover:bg-[#FFFFFF16] md:w-fit"
            >
              <Pencil className="h-4 w-4" />
              <div>Edit</div>
            </Button>
          </DashboardCard>
          <AccountDetails
            completedTasks={completedTasks}
            totalInteractions={totalInteractions}
            favouriteProjects={favouriteProjects}
            earnedRewards={earnedRewards || 0}
            inviteCode={inviteCode || "Invite code not available"}
          />
        </div>
      ) : (
        <div className=" flex items-center justify-center">
          <Image src={profile} alt="profile" className="block dark:hidden" />
          <Image
            src={profileDark}
            alt="profile"
            className="hidden dark:block"
          />
        </div>
      )}
    </DashboardLayout>
  );
}

const AccountDetails = ({
  completedTasks,
  totalInteractions,
  favouriteProjects,
  earnedRewards,
  inviteCode,
}: {
  completedTasks: number;
  totalInteractions: number;
  favouriteProjects: number;
  earnedRewards: number;
  inviteCode: string;
}) => {
  return (
    <div className="grid grid-cols-2">
      {/* space-y-10 ^^
       <div className="flex flex-col gap-4 md:max-w-sm md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Typography variant={"h4"}>Password</Typography>
          <div className="flex items-center gap-4">
            <Input
              placeholder="**************"
              value={"**************"}
              disabled
              className="w-full border border-neutral-200 md:w-fit"
            />
            <EyeOff className="h-4 w-4 cursor-pointer md:hidden" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <EyeOff className="hidden h-4 w-4 cursor-pointer md:block" />
          <Button variant={"secondary"} className="w-full md:w-fit">
            Change
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 md:max-w-sm md:flex-row">
        <div className="space-y-2">
          <Typography variant={"h4"}>Your Info</Typography>
          <Typography variant={"smallTitle"}>example123@gmail.com</Typography>
        </div>
        <Button variant={"secondary"} className="w-full md:w-fit">
          Add Email
        </Button>
      </div> */}
      <div className="flex flex-col gap-4 self-start justify-self-center md:max-w-sm md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Typography variant={"h4"}>Invite Friends</Typography>
          <div className="flex items-center gap-4">
            <Input
              placeholder="**************"
              value={inviteCode}
              disabled
              className="w-full border border-neutral-200 md:w-fit"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"secondary"} className="w-full md:w-fit">
            Copy
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 self-start justify-self-center md:max-w-sm md:flex-row">
        <div className="space-y-2">
          <Typography variant={"h4"}>Your Stats</Typography>
          <div className="flex flex-col gap-2">
            <Typography
              variant={"smallTitle"}
            >{`Total tasks completed: ${completedTasks}`}</Typography>
            <Typography
              variant={"smallTitle"}
            >{`Total interactions: ${totalInteractions}`}</Typography>
            <Typography
              variant={"smallTitle"}
            >{`Favourite projects: ${favouriteProjects}`}</Typography>
            <Typography
              variant={"smallTitle"}
            >{`Earned rewards: ${earnedRewards}`}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
