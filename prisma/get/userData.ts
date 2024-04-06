import { prisma } from "../client";

interface getUserProps {
  ethAddress: string;
  includeInteractions?: boolean;
  includeRewards?: boolean;
}
export const getUser = async ({
  ethAddress,
  includeInteractions = false,
  includeRewards = false,
}: getUserProps) => {
  return await prisma.user.findUnique({
    where: { ethereumAddress: ethAddress },
    select: {
      ethereumAddress: true,
      id: true,
      inviteCode: true,
      interactions: includeInteractions
        ? {
            select: {
              id: true,
              type: true,
              contractType: true,
              chainId: true,
              points: true,
              createdAt: true,
              updatedAt: true,
            },
          }
        : undefined,
      UserRewards: includeRewards
        ? {
            select: {
              id: true,
              type: true,
              points: true,
              claimedAt: true,
            },
          }
        : undefined,
    },
  });
};
