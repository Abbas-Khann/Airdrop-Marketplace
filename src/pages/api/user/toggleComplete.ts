import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { InteractionType } from "@prisma/client";
import { getCsrfToken } from "next-auth/react";
import { CompleteTaskType, handleCompleteTask } from "prisma/handlers/project";
import {
  ToggleUserTaskCompletionProps,
  toggleUserProjectCompletion,
} from "prisma/create/newUserTask";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  const body = req.body as ToggleUserTaskCompletionProps;

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
    await toggleUserProjectCompletion(body);
    console.log("Task completed Toogle for user");
    res.status(200).json({ message: "Task completed Toogle for user" });
  } catch (error) {
    console.error("Error in /api/task:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
