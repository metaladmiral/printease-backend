import { Response } from "express";
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from "../types";

const prisma = new PrismaClient()

async function updateOrderStatus(req: RequestWithUser, res: Response) {

    let {order_id, order_status} = req.body

    if(order_id===undefined || order_status===undefined) {
        res.status(400).json({"success": "false", "msg": "Some fields are missing."})
        return;
    }

    const parsedOrderStatus = parseInt(order_status)

    if(isNaN(parsedOrderStatus) || parsedOrderStatus>2 || parsedOrderStatus < 0) {
        res.status(400).json({"success": false, "msg": "Order status value should be 0, 1 or 2"})
        return
    }

    await prisma.order.update({
        where: {
            order_id: order_id
        },
        data: {
            status: parsedOrderStatus
        }
    })

    return res.send({"success": true, "msg": "Updated Status of the order."})

}

export default updateOrderStatus