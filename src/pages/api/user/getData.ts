import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "prisma/client";
import handleUser from "prisma/handlers/user";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "../auth/[...nextauth]";
import { getUser } from "prisma/get/userData";

// TODO: review if we need to use getServerSession and getAuthOptions

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { ethereumAddress } = req.query;

  if (!ethereumAddress || typeof ethereumAddress !== "string") {
    console.error("Missing parameters");
    return res.status(400).json({ message: "Missing parameters" });
  }

  try {
    const user = await getUser({
      ethAddress: ethereumAddress.toLowerCase(),
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
}
