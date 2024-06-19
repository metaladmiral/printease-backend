import { Response } from "express";
import { RequestWithUser } from "../../types";
import ShopDbSerice from "../../prisma/shopDbService";

async function getShopDetails(req: RequestWithUser, res: Response) {
  if (req.query.shopid === undefined) {
    return res.status(400).send("shopid request in Query Params");
  }

  const shopId = req.query.shopid;
  const shopIdNum = parseInt(shopId as string);
  if (isNaN(shopIdNum)) {
    return res.status(400);
  }

  try {
    const allShops = await ShopDbSerice.getShopDetails(shopIdNum);
    return res.send(allShops);
  } catch (err) {
    return res.status(500).send({ success: "false", msg: err });
  }
}

export default getShopDetails;
