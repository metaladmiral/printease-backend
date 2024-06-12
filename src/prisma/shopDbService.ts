import { Prisma } from "@prisma/client";
import prisma from "./prisma";

const ShopDbSerice = {
  getShops: async () => {
    try {
      const shops = await prisma.shop.findMany({
        include: {
          User: {
            select: {
              user_id: true,
              username: true,
              email: true,
              phone: true,
            },
          },
        },
      });
      return shops;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Cannot connect to DB!";
      }
      throw "Error in running the query!";
    } finally {
      prisma.$disconnect;
    }
  },

  getShopDetails: async (shopId: number) => {
    try {
      return await prisma.shop.findUnique({
        where: {
          shop_id: shopId,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Cannot connect to DB!";
      }
      throw "Error in running the query!";
    } finally {
      prisma.$disconnect;
    }
  },
};

export default ShopDbSerice;
