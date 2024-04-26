import { Response } from "express";
import { OrderDbOrderByObj, RequestWithUser } from "../types";
import OrderDbService from "../prisma/orderDbService";

async function getAllOrders(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  const limit = req.body.limit !== undefined ? parseInt(req.body.limit) : 10;
  const offset = req.body.offset !== undefined ? parseInt(req.body.offset) : 0;

  try {
    const orderByObj: OrderDbOrderByObj = { updatedAt: "desc" };
    const orderDetails = await OrderDbService.getOrders(
      undefined,
      orderByObj,
      limit,
      offset
    );
    return res.send(orderDetails);
  } catch (err) {
    return res.send("DB ERROR");
  }
}

export default getAllOrders;
