import { Response } from "express";
import { OrderDbWhereObj, RequestWithUser } from "../types";
import OrderDbService from "../prisma/orderDbService";

async function getPickedOrders(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  try {
    const whereObj: OrderDbWhereObj = { status: 2 };
    const orderDetails = await OrderDbService.getOrders(whereObj);
    return res.send(orderDetails);
  } catch (err) {
    return res.send("DB Error");
  }
}

export default getPickedOrders;
