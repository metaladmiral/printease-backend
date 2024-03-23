import { Response } from "express";
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from "../types";

const prisma = new PrismaClient()

async function getPendingOrders(req: RequestWithUser, res: Response) {

    if(req.user===undefined) {
        res.status(403).send("Access Forbidden")
        return;
    }

    let orderDetails = await prisma.order.findMany({
        where: {
            status: 0
        }
    })

    res.send(orderDetails)

}

export default getPendingOrders