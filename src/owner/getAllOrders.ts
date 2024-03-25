import { Response } from "express";
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from "../types";

const prisma = new PrismaClient()

async function getAllOrders(req: RequestWithUser, res: Response) {
    let offset, limit
    if(req.body.limit == undefined) {
        limit = 10
    }
    if(req.body.offset == undefined) {
        offset = 0
    }

    if(req.user===undefined) {
        res.status(403).send("Access Forbidden")
        return;
    }

    try {

        let orderDetails = await prisma.order.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                updatedAt: 'desc'
            }
        })
        res.send(orderDetails)

    }catch(err) {
        res.send("DB ERROR")
    }


}

export default getAllOrders