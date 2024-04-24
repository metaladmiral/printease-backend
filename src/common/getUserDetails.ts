import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../types";

const prisma = new PrismaClient();

async function getUserDetails(req: RequestWithUser, res: Response) {
  if (req.query.user_id === undefined) {
    return res.status(400).send("UserID request in Query Params");
  }

  let user_id = req.query.user_id;

  user_id = user_id?.toString();

  try {
    let userDetails = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
    });

    res.send(userDetails);
  } catch (err) {
    res.send("DB error");
  }
}

export default getUserDetails;
