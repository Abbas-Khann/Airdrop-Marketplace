import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { InteractionType } from "@prisma/client";
import { getCsrfToken } from "next-auth/react";
import {
  FavouriteProjectType,
  favouriteProject,
} from "prisma/handlers/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  const body = req.body as FavouriteProjectType;

  if (!body) {
    console.error("Missing parameters");
    return res.status(400).json({ message: "Missing parameters" });
  }

  const session = await getServerSession(req, res, getAuthOptions(req));

  const csrfToken = await getCsrfToken({ req: { headers: req.headers } });

  if (!session && !csrfToken) {
    res.status(401).send({
      error: "You must be signed in to interact with the API",
    });
  }

  try {
    await favouriteProject(body);
    console.log("Project Favourited for user");
    res.status(200).json({ message: "Project Favourited for user" });
  } catch (error) {
    console.error("Error in /api/project:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
