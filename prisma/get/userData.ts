import { prisma } from "../client";

interface getUserProps {
  ethAddress: string;
  includeInteractions?: boolean;
  includeRewards?: boolean;
  includeProjects?: boolean;
  includeTasks?: boolean;
}

export const getUser = async ({
  ethAddress,
  includeInteractions = false,
  includeRewards = false,
  includeProjects = false,
  includeTasks = false,
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
      UserProjects: includeProjects
        ? {
            select: {
              id: true,
              projectId: true,
              favourite: true,
            },
          }
        : undefined,
      UserTasks: includeTasks
        ? {
            select: {
              id: true,
              taskId: true,
              completed: true,
            },
          }
        : undefined,
    },
  });
};
