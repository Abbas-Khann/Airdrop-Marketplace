import { getUser } from "../get/userData";
import { createUser } from "../create/newUser";

type handleUserProps = {
  ethAddress: string;
  inviteCode?: string;
  includeInteractions?: boolean;
  includeRewards?: boolean;
  includeProjects?: boolean;
  includeTasks?: boolean;
};

// NOTE: Handler for either creating a new User or either returning the current one if exists
export default async function handleUser({
  ethAddress,
  includeInteractions = false,
  includeRewards = false,
  includeProjects = false,
  includeTasks = false,
}: handleUserProps) {
  const userExists = await getUser({
    ethAddress: ethAddress.toLowerCase(),
    includeInteractions,
    includeRewards,
    includeProjects,
    includeTasks,
  });

  if (userExists) {
    return userExists;
  }

  return await createUser({
    ethAddress: ethAddress.toLowerCase(),
  });
}
