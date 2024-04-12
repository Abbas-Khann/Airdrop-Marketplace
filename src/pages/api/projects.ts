import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "./auth/[...nextauth]";
import { InteractionType } from "@prisma/client";
import { getCsrfToken } from "next-auth/react";
import { getAllProjects } from "prisma/get/projectData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  //   const session = await getServerSession(req, res, getAuthOptions(req));

  //   const csrfToken = await getCsrfToken({ req: { headers: req.headers } });

  //   if (!session && !csrfToken) {
  //     res.status(401).send({
  //       error: "You must be signed in to interact with the API",
  //     });
  //   }

  try {
    const projects = await getAllProjects();
    console.log("Projects fetched");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error in /api/tasks:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
