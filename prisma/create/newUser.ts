import { prisma } from "../client";
import { getNewInviteCode } from "../get/newInviteCode";

interface createUserProps {
  ethAddress: string;
}

export const createUser = async ({ ethAddress }: createUserProps) => {
  return await prisma.user.create({
    data: {
      ethereumAddress: ethAddress,
      inviteCode: getNewInviteCode(),
    },
    include: { interactions: true },
  });
};
