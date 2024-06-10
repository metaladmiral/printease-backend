import { Prisma } from "@prisma/client";
import {
  Order,
  OrderDetail,
  OrderDbWhereObj,
  OrderDbOrderByObj,
} from "../types";
import prisma from "./prisma";

const OrderDbService = {
  createOrder: async (orderObject: Order, orderDetailObject: OrderDetail) => {
    try {
      const [newOrderSummary, newOrderDetails] = await prisma.$transaction([
        prisma.order.create({
          data: {
            order_id: orderObject.orderId,
            shop_id: orderObject.shopId,
            user_id: orderObject.userId,
            order_title: orderObject.title,
            payment_id: null,
            status: -1,
            total_price: orderObject.totalPriceFloat,
            updatedAt: new Date(),
          },
        }),

        prisma.orderDetail.create({
          data: {
            order_id: orderDetailObject.orderId,
            file_details: orderDetailObject.fileDetails,
            page_size: orderDetailObject.pageSize,
            print_color: orderDetailObject.printColor,
            print_type: orderDetailObject.printType,
            total_pages: orderDetailObject.totalPages,
            price_per_page: orderDetailObject.pricePerPage,
          },
        }),
      ]);
      return { orderSummary: newOrderSummary, orderDetails: newOrderDetails };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Cannot connect to DB!";
      }
      throw "Error in running the query!";
    } finally {
      prisma.$disconnect;
    }
  },

  getOrders: async (
    whereObj?: OrderDbWhereObj,
    orderByObj?: OrderDbOrderByObj,
    limit?: number,
    offset?: number
  ) => {
    let orders;

    if (orderByObj === undefined) {
      orderByObj = {};
    }

    if (limit === undefined) {
      limit = 10;
    }

    if (offset === undefined) {
      offset = 0;
    }

    try {
      orders = await prisma.order.findMany({
        take: limit,
        skip: offset,
        where: whereObj,
        orderBy: orderByObj,
      });
      return orders;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Cannot connect to DB!";
      }
      throw "Error in running the query!";
    } finally {
      prisma.$disconnect;
    }
  },

  getOrderDetails: async (orderId: string) => {
    try {
      return await prisma.order.findUnique({
        where: {
          order_id: orderId,
        },
        include: {
          OrderDetails: {
            select: {
              file_details: true,
              page_size: true,
              print_color: true,
              print_type: true,
              total_pages: true,
              price_per_page: true,
            },
          },
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
  updateOrder: async (data: object, orderId: string) => {
    try {
      await prisma.order.update({
        where: {
          order_id: orderId,
        },
        data: data,
      });
      return 1;
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

export default OrderDbService;
