import { Response } from "express";
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from "../types";
import { JwtPayload } from "jsonwebtoken";

var crypto = require("crypto");

const prisma = new PrismaClient()

async function createOrder(req: RequestWithUser, res: Response) {

    const {title, 
        totalprice:totalPrice,
         pagesize: pageSize, color, printtype: printType, totalpages: totalPages, paymentid: paymentId, priceperpage: pricePerPage} = req.body
    
    if(!pageSize || !color || !printType || !totalPages || !paymentId || !pricePerPage) { return res.send({"success": "false", "msg":"some required fields are missing"}) }
    if(!totalPrice) { res.send({"success": "false", "msg":"price is zero"}); return; }
    
    if(req.user===undefined) {
        res.status(403).send("Access Forbidden")
        return;
    }
    
    let order_id = crypto.randomBytes(20).toString('hex')
    let user: JwtPayload | undefined;
    let user_id: string;

    user = req.user
    user_id = user?.user_id
    let filename = req.body.file
    let totalPriceFloat = parseFloat(totalPrice)
    let totalPagesInt = parseInt(totalPages)

    try {
        let order = await prisma.order.create({
            data: {
                order_id: order_id,
                user_id: user_id,
                order_title: title,
                payment_id: paymentId,
                status: 0,
                total_price: totalPriceFloat,
                updatedAt: new Date()
            },
        });
        let order_details = await prisma.orderDetail.create({
            data: {
                order_id: order_id,
                file_details: `["${filename}"]`,
                page_size: pageSize,
                print_color: color,
                print_type: printType,
                total_pages: totalPagesInt,
                price_per_page: parseFloat(pricePerPage)
            },
        });

        res.json({"success": "true"})

    }
    catch(err) {
        console.log(err)
        res.status(500).send({"success": "false", "msg": `DB Error`})
        return
    }

}

export default createOrder