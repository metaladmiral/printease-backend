import { Response } from "express";
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from "../types";

const prisma = new PrismaClient()

async function getOrderDetails(req: RequestWithUser, res: Response) {

    if(req.user===undefined) {
        res.status(403).send("Access Forbidden")
        return;
    }

    let order_id = req.query.order_id

    order_id = order_id?.toString()


    try {
        let orderDetails = await prisma.order.findUnique({
            where: {
                order_id: order_id
            },
            include: {
                orderdetail: {
                    select: {
                        file_details: true,
                        page_size: true,
                        print_color: true,
                        print_type: true,
                        total_pages: true
                    }
                }
            }
        })
    
        res.send(orderDetails)
    }
    catch(err) {
        res.send("DB error")
    }


}

export default getOrderDetails