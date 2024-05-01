import { Response } from "express";
import { OrderDbWhereObj, OrderStatus, RequestWithUser } from "../types";
import OrderDbService from "../prisma/orderDbService";

async function getOrders(
  req: RequestWithUser,
  res: Response,
  orderStatus: OrderStatus
) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  const limit = req.body.limit !== undefined ? parseInt(req.body.limit) : 10;
  const offset = req.body.offset !== undefined ? parseInt(req.body.offset) : 0;

  let statusNum;
  if (orderStatus === "ORDER_PENDING") statusNum = 0;
  if (orderStatus === "ORDER_PREPARED") statusNum = 1;
  if (orderStatus === "ORDER_PICKED") statusNum = 2;

  let whereObj: OrderDbWhereObj = { status: statusNum };

  if (req.user.user_type === 1) {
    whereObj.user_id = req.user.user_id;
  }

  try {
    const orderDetails = await OrderDbService.getOrders(
      whereObj,
      undefined,
      limit,
      offset
    );
    return res.send(orderDetails);
  } catch (err) {
    return res.send("DB Error");
  }
}

export default getOrders;
