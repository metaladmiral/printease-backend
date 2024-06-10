import { Response } from "express";
import {
  OrderDbOrderByObj,
  OrderDbWhereObj,
  OrderStatus,
  RequestWithUser,
} from "../../types";
import OrderDbService from "../../prisma/orderDbService";
import { UserTypes, OrderStatusNum } from "../../constants";

async function getOrders(
  req: RequestWithUser,
  res: Response,
  orderStatus: OrderStatus = null
) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  if (!req.query.shop_id) {
    res.status(422).send("shop_id query string param is required!");
    return;
  }

  const shopId = parseInt(req.query.shop_id as string);
  if (isNaN(shopId)) {
    return res.status(400);
  }
  const limit = req.body.limit !== undefined ? parseInt(req.body.limit) : 10;
  const offset = req.body.offset !== undefined ? parseInt(req.body.offset) : 0;

  let orderObj: OrderDbOrderByObj = { createdAt: "desc" };
  let whereObj: OrderDbWhereObj = {
    shop_id: shopId,
  };

  //only show orders to owner which have successful payments
  if (req.user.user_type == UserTypes.OWNER)
    whereObj.NOT = { status: OrderStatusNum.ORDER_PAYMENT_PENDING };

  // only show orders of the user only
  if (req.user.user_type == UserTypes.USER) whereObj.user_id = req.user.user_id;

  if (orderStatus) {
    let statusNum;

    if (orderStatus === "ORDER_PENDING")
      statusNum = OrderStatusNum.ORDER_PENDING;
    if (orderStatus === "ORDER_PREPARED")
      statusNum = OrderStatusNum.ORDER_PREPARED;
    if (orderStatus === "ORDER_PICKED") statusNum = OrderStatusNum.ORDER_PICKED;

    whereObj.status = statusNum;
  }

  try {
    const orderDetails = await OrderDbService.getOrders(
      whereObj,
      orderObj,
      limit,
      offset
    );
    return res.send(orderDetails);
  } catch (err) {
    return res.status(500).send({ success: "false", msg: err });
  }
}

export default getOrders;
