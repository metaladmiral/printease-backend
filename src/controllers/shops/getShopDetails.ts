import { Response } from "express";
import { RequestWithUser } from "../../types";
import ShopDbSerice from "../../prisma/shopDbService";
import redisClient from "../../redis";

async function getShopDetails(req: RequestWithUser, res: Response) {
  if (req.query.shopid === undefined) {
    return res.status(400).send("shopid request in Query Params");
  }

  const shopId = req.query.shopid;
  const shopIdNum = parseInt(shopId as string);
  if (isNaN(shopIdNum)) {
    return res.status(400);
  }

  const shopDetails = await redisClient.get(shopId as string);
  if (shopDetails) {
    return res.send(shopDetails);
  }

  try {
    const shopDetails = await ShopDbSerice.getShopDetails(shopIdNum);
    redisClient.set(shopId as string, JSON.stringify(shopDetails));
    return res.send(shopDetails);
  } catch (err) {
    return res.status(500).send({ success: "false", msg: err });
  }
}

export default getShopDetails;
