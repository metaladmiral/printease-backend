import { Response } from "express";
import { OrderDbWhereObj, RequestWithUser } from "../types";
import OrderDbService from "../prisma/orderDbService";

async function getMyOrders(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  let userId: string = req.user.user_id;

  try {
    const whereObj: OrderDbWhereObj = { user_id: userId };
    const orders = await OrderDbService.getOrders(whereObj, { status: "asc" });
    return res.send(orders);
  } catch (err) {
    return res.send("DB ERROR");
  }
}

export default getMyOrders;
