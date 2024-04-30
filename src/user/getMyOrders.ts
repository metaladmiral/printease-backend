import { Response } from "express";
import { OrderDbOrderByObj, OrderDbWhereObj, RequestWithUser } from "../types";
import OrderDbService from "../prisma/orderDbService";

async function getMyOrders(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  const userId: string = req.user.user_id;

  const limit = req.body.limit !== undefined ? parseInt(req.body.limit) : 10;
  const offset = req.body.offset !== undefined ? parseInt(req.body.offset) : 0;

  try {
    const whereObj: OrderDbWhereObj = { user_id: userId };
    const orderByObj: OrderDbOrderByObj = { status: "asc" };
    const orders = await OrderDbService.getOrders(
      whereObj,
      orderByObj,
      limit,
      offset
    );
    return res.send(orders);
  } catch (err) {
    return res.send("DB ERROR");
  }
}

export default getMyOrders;
