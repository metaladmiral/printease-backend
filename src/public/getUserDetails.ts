import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../types";

const prisma = new PrismaClient();

async function getUserDetails(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden!");
    return;
  }

  res.send(req.user);
}

export default getUserDetails;
