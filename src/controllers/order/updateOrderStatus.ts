import { Response } from "express";
import { RequestWithUser, UpdateOrder } from "../../types";
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
    let orderDataToUpdate: UpdateOrder = {
      status: parsedOrderStatus,
    };
    let resStatus = await OrderDbService.updateOrder(
      orderDataToUpdate,
      orderId
    );
    if (resStatus == 1) {
      return res.send({ success: true, msg: "Updated Status of the order." });
    } else {
      return res.send({ success: false, msg: "Error running the query!" });
    }
  } catch (err) {
    return res.status(500).send({ success: false, msg: err });
  }
}

export default updateOrderStatus;
