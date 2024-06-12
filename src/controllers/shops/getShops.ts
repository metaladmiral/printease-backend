import { Response } from "express";
import { RequestWithUser } from "../../types";
import ShopDbSerice from "../../prisma/shopDbService";

async function getShops(req: RequestWithUser, res: Response) {
  try {
    const allShops = await ShopDbSerice.getShops();
    return res.send(allShops);
  } catch (err) {
    return res.status(500).send({ success: "false", msg: err });
  }
}

export default getShops;
