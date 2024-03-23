import { Response } from "express";
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from "../types";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient()

async function getMyOrders(req: RequestWithUser, res: Response) {

    if(req.user===undefined) {
        res.status(403).send("Access Forbidden")
        return;
    }

    let user_id: String = req.user.user_id;

    let orders = await prisma.order.findMany({
        where: {
            user_id: user_id
        },
    })

    res.send(orders)
    console.log(orders)

}

export default getMyOrders