import { getUser } from "../get/userData";
import { createUser } from "../create/newUser";

type handleUserProps = {
  ethAddress: string;
  inviteCode?: string;
  includeInteractions?: boolean;
  includeRewards?: boolean;
};

export default async function handleUser({
  ethAddress,
  includeInteractions = false,
  includeRewards = false,
}: handleUserProps) {
  const userExists = await getUser({
    ethAddress: ethAddress.toLowerCase(),
    includeInteractions,
    includeRewards,
  });

  if (userExists) {
    return userExists;
  }

  return await createUser({
    ethAddress: ethAddress.toLowerCase(),
  });
}
