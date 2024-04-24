import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUser } from "../types";

const prisma = new PrismaClient();

async function getOrderDetails(req: RequestWithUser, res: Response) {
  if (req.query.order_id === undefined) {
    return res.status(400).send("OrderID request in Query Params");
  }

  let order_id = req.query.order_id;

  order_id = order_id?.toString();

  try {
    let orderDetails = await prisma.order.findUnique({
      where: {
        order_id: order_id,
      },
      include: {
        OrderDetails: {
          select: {
            file_details: true,
            page_size: true,
            print_color: true,
            print_type: true,
            total_pages: true,
            price_per_page: true,
          },
        },
      },
    });

    res.send(orderDetails);
  } catch (err) {
    res.send("DB error");
  }
}

export default getOrderDetails;
