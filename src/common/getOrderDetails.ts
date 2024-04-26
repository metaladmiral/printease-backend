import { Response } from "express";
import { RequestWithUser } from "../types";
import OrderDbService from "../prisma/orderDbService";

async function getOrderDetails(req: RequestWithUser, res: Response) {
  if (req.query.order_id === undefined) {
    return res.status(400).send("OrderID request in Query Params");
  }

  const order_id = req.query.order_id.toString();

  try {
    const orderDetails = OrderDbService.getOrderDetails(order_id);
    return res.send(orderDetails);
  } catch (err) {
    return res.send("DB error");
  }
}

export default getOrderDetails;
