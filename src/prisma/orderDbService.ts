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
      await prisma.$transaction([
        prisma.order.create({
          data: {
            order_id: orderObject.orderId,
            user_id: orderObject.userId,
            order_title: orderObject.title,
            payment_id: orderObject.paymentId,
            status: 0,
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
    } catch (err) {
      throw err;
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

    if (whereObj === undefined) {
      whereObj = {};
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
      throw err;
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
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },

  updateOrderStatus: async (orderId: string, parsedOrderStatus: number) => {
    try {
      await prisma.order.update({
        where: {
          order_id: orderId,
        },
        data: {
          status: parsedOrderStatus,
        },
      });
    } catch (err) {
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },
};

export default OrderDbService;
