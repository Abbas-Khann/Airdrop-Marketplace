import { ContractType, InteractionType, RewardType } from "@prisma/client";
import { prisma } from "../client";

interface getUserProps {
  ethAddress: string;
  includeInteractions?: boolean;
  includeRewards?: boolean;
  includeProjects?: boolean;
  includeTasks?: boolean;
}
type UserData = {
  ethereumAddress: string;
  id: number;
  inviteCode: string;
  createdAt: Date;
  interactions?: {
    id: number;
    type: InteractionType;
    contractType?: ContractType | null;
    chainId?: number | null;
    points: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  UserRewards?: {
    id: number;
    type: RewardType;
    points: number;
    claimedAt: Date;
  }[];
  UserProjects?: {
    id: number;
    projectId: number;
    favourite: boolean;
  }[];
  UserTasks?: {
    id: number;
    taskId: number;
    completed: boolean;
  }[];
};

export const getUser = async ({
  ethAddress,
  includeInteractions = false,
  includeRewards = false,
  includeProjects = false,
  includeTasks = false,
}: getUserProps): Promise<UserData | null> => {
  return await prisma.user.findUnique({
    where: { ethereumAddress: ethAddress },
    select: {
      ethereumAddress: true,
      id: true,
      inviteCode: true,
      createdAt: true,
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

type UserTaskData = {
  id: number;
  completed: boolean;
  userId: number;
  taskId: number;
};

export const getUserTask = async ({
  userId,
  taskId,
}: {
  userId: number;
  taskId: number;
}): Promise<UserTaskData | null> => {
  return await prisma.userTask.findFirst({
    where: {
      AND: {
        userId: userId,
        taskId: taskId,
      },
    },
    select: {
      id: true,
      completed: true,
      userId: true,
      taskId: true,
    },
  });
};

type UserProjectData = {
  id: number;
  favourite: boolean;
  userId: number;
  projectId: number;
};

export const getUserProject = async ({
  userId,
  projectId,
}: {
  userId: number;
  projectId: number;
}): Promise<UserProjectData | null> => {
  return await prisma.userProject.findFirst({
    where: {
      AND: {
        userId: userId,
        projectId: projectId,
      },
    },
    select: {
      id: true,
      favourite: true,
      userId: true,
      projectId: true,
    },
  });
};
