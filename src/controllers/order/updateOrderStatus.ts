import { Response } from "express";
import { RequestWithUser } from "../../types";
import OrderDbService from "../../prisma/orderDbService";

async function updateOrderStatus(req: RequestWithUser, res: Response) {
  let { order_id: orderId, order_status } = req.body;

  if (orderId === undefined || order_status === undefined) {
    res.status(400).json({ success: "false", msg: "Some fields are missing." });
    return;
  }

  const parsedOrderStatus = parseInt(order_status);

  if (
    isNaN(parsedOrderStatus) ||
    parsedOrderStatus > 2 ||
    parsedOrderStatus < 0
  ) {
    res
      .status(400)
      .json({ success: false, msg: "Order status value should be 0, 1 or 2" });
    return;
  }

  try {
    await OrderDbService.updateOrderStatus(orderId, parsedOrderStatus);
    res.send({ success: true, msg: "Updated Status of the order." });
  } catch (err) {
    res.send("DB Error");
  }
}

export default updateOrderStatus;
