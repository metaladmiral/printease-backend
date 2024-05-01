import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../../types";

const prisma = new PrismaClient();

async function getPerPagePrice(req: RequestWithUser, res: Response) {
  res.send({
    RATE1_15: 2.5,
    RATE16_25: 2.0,
    RATE26_: 1.5,
  });
}

export default getPerPagePrice;
