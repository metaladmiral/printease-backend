import { Response } from "express";
import {
  OrderDbOrderByObj,
  OrderDbWhereObj,
  RequestWithUser,
} from "../../types";
import OrderDbService from "../../prisma/orderDbService";
import { UserTypes } from "../../constants";

async function getAllOrders(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  const limit = req.body.limit !== undefined ? parseInt(req.body.limit) : 10;
  const offset = req.body.offset !== undefined ? parseInt(req.body.offset) : 0;

  let whereObj: OrderDbWhereObj = {};
  if (req.user.user_type == UserTypes.OWNER) whereObj.NOT = { status: -1 };
  if (req.user.user_type == UserTypes.USER) whereObj.user_id = req.user.user_id;

  const orderByObj: OrderDbOrderByObj = { updatedAt: "desc" };

  try {
    const orderDetails = await OrderDbService.getOrders(
      whereObj,
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
