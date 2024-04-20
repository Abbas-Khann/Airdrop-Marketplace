import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { InteractionType } from "@prisma/client";
import { getCsrfToken } from "next-auth/react";
import { FavouriteProjectType } from "prisma/handlers/project";
import handleUser from "prisma/handlers/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  const body = req.body as FavouriteProjectType;

  if (!body) {
    console.error("Missing parameters");
    return res.status(400).json({ message: "Missing parameters" });
  }

  const session = await getServerSession(req, res, getAuthOptions(req));

  const csrfToken = await getCsrfToken({ req: { headers: req.headers } });

  if (!csrfToken) {
    res.status(401).send({
      error:
        "Token Not Found !! You must be signed in to interact with the API",
    });
    return;
  }

  if (!session) {
    res.status(401).send({
      error:
        "Session Not Found !! You must be signed in to interact with the API",
    });
    return;
  }

  const userAddress = session.user?.name;
  if (!userAddress) {
    res.status(401).send({
      error: "User not found in session",
    });
    return;
  }

  try {
    const userData = await handleUser({
      ethAddress: userAddress,
      includeInteractions: true,
      includeProjects: true,
      includeRewards: true,
      includeTasks: true,
    });
    console.log("User Data fetched");
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in /api/user:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
