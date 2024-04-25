import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../types";

const prisma = new PrismaClient();

async function getAllOrders(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  let limit = req.body.limit !== undefined ? parseInt(req.body.limit) : 10;
  let offset = req.body.offset !== undefined ? parseInt(req.body.offset) : 0;

  try {
    let orderDetails = await prisma.order.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        updatedAt: "desc",
      },
    });
    res.send(orderDetails);
  } catch (err) {
    res.send("DB ERROR");
  }
}

export default getAllOrders;
