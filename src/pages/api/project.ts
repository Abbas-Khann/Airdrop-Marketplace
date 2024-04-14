import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "./auth/[...nextauth]";
import { InteractionType } from "@prisma/client";
import { getCsrfToken } from "next-auth/react";
import getProject, {
  CreateProjectType,
  createProject,
} from "prisma/handlers/project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    const body = req.body as CreateProjectType;

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
      await createProject(body);
      console.log("Project Created in the db");
      res.status(200).json({ message: "Project Created in the db" });
    } catch (error) {
      console.error("Error in /api/project:", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: (error as any).message,
      });
    }
  } else if (req.method == "GET") {
    const projectId = req.query.id as string;
    const projectName = req.query.name as string;

    // if (projectId == undefined || projectName == undefined) {
    //   res.status(400).send({
    //     error: "Missing Project ID or Name",
    //   });
    // }

    const projectData = await getProject({
      id: Number(projectId),
      name: projectName,
    });
    // console.log(projectData);
    console.log("Project Data fetched");
    res.status(200).json(projectData);
  } else {
    return res.status(405).end();
  }
}
