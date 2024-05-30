import { Response } from "express";
import { RequestWithUser, UpdateOrder } from "../../types";
import OrderDbService from "../../prisma/orderDbService";

async function updateOrderPaymentId(req: RequestWithUser, res: Response) {
  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  let { orderid: orderId, paymentid: paymentId } = req.body;

  if (!orderId || !paymentId) {
    return res
      .status(400)
      .json({ success: false, msg: "Order ID or Payment ID missing!" });
  }

  const user = req.user;
  const userId: string = user?.user_id;
  orderId = req.body.orderid;
  paymentId = req.body.paymentid;

  try {
    const orderDataToUpdate: UpdateOrder = {
      payment_id: paymentId,
      status: 0,
    };
    const reqStatus = await OrderDbService.updateOrder(
      orderDataToUpdate,
      orderId
    );
    if (reqStatus) {
      return res.json({ success: true, msg: "Order Payment ID updated" });
    } else {
      return res
        .status(500)
        .json({ success: false, msg: "Some Unknown Error" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: "DB ERROR" });
  }
}

export default updateOrderPaymentId;
