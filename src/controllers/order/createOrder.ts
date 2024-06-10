import { Response } from "express";
import { OrderDetail, RequestWithUser } from "../../types";
import { JwtPayload } from "jsonwebtoken";
import OrderDbService from "../../prisma/orderDbService";
import { Order } from "../../types";

var crypto = require("crypto");

async function createOrder(req: RequestWithUser, res: Response) {
  const {
    title,
    totalprice: totalPrice,
    pagesize: pageSize,
    color,
    printtype: printType,
    totalpages: totalPages,
    paymentid: paymentId,
    priceperpage: pricePerPage,
    shopid: shopId,
    spiralbinding: spiralBinding,
  } = req.body;

  if (
    !pageSize ||
    !color ||
    !printType ||
    !totalPages ||
    !paymentId ||
    !pricePerPage ||
    !shopId ||
    !spiralBinding
  ) {
    return res.send({
      success: "false",
      msg: "some required fields are missing",
    });
  }
  if (!totalPrice) {
    res.send({ success: "false", msg: "price is zero" });
    return;
  }

  if (req.user === undefined) {
    res.status(403).send("Access Forbidden");
    return;
  }

  const spiralBindingBool: boolean = spiralBinding === "true";
  const orderId = crypto.randomBytes(20).toString("hex");
  const user = req.user;
  const userId = user?.user_id;
  const shopIdInt = parseInt(shopId as string);

  let orderObject: Order = {
    orderId,
    userId,
    title,
    totalPriceFloat: parseFloat(totalPrice),
    shopId: shopIdInt,
  };

  let orderDetailObject: OrderDetail = {
    orderId: orderId,
    fileDetails: `["${req.body.file}"]`,
    pageSize: pageSize,
    printColor: color,
    printType: printType,
    totalPages: parseInt(totalPages),
    pricePerPage: parseFloat(pricePerPage),
    spiralBinding: spiralBindingBool,
  };

  try {
    const newOrder = await OrderDbService.createOrder(
      orderObject,
      orderDetailObject
    );

    res.json({
      success: "true",
      data: {
        orderSummary: newOrder.orderSummary,
        orderDetails: newOrder.orderDetails,
      },
    });
  } catch (err) {
    return res.status(500).send({ success: "false", msg: err });
  }
}

export default createOrder;
