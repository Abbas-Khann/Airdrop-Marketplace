import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { InteractionType } from "@prisma/client";
import { getCsrfToken } from "next-auth/react";
import { FavouriteProjectType } from "prisma/handlers/project";
import formidable from "formidable";

const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS;

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

  const address = session?.user?.name;
  if (address != ADMIN_ADDRESS) {
    res.status(401).send({
      error: "Only accessible by admin",
    });
  }

  try {
    const form = new formidable.IncomingForm();
    // form. = true; // Keep file extensions

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error uploading file." });
        return;
      }

      if (!files || !files.file) {
        res.status(500).json({ error: "No File Found" });
        return;
      }

      const filePath = files.file[0]?.filepath; // Get the file path
      console.log("Project Favourited for user");
      res.status(200).json({ message: "Project Favourited for user" });
    });
  } catch (error) {
    console.error("Error in /api/project:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: (error as any).message,
    });
  }
}
