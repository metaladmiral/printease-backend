import { Response } from "express";
import { RequestWithUser } from "../../types";
import ShopDbSerice from "../../prisma/shopDbService";
import redisClient from "../../redis";

async function getShops(req: RequestWithUser, res: Response) {
  const shops = await redisClient.get("all_shops");
  if (shops) {
    return res.send(shops);
  }

  try {
    const allShops = await ShopDbSerice.getShops();
    redisClient.set("all_shops", JSON.stringify(allShops));
    return res.send(allShops);
  } catch (err) {
    return res.status(500).send({ success: "false", msg: err });
  }
}

export default getShops;
