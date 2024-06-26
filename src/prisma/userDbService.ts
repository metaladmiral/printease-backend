import { Prisma } from "@prisma/client";
import prisma from "./prisma";

const UserDbService = {
  createUser: async (
    username: string,
    email: string,
    phone: string,
    hashedPass: string,
    userId: string
  ) => {
    try {
      return await prisma.user.create({
        data: {
          username: username,
          email: email,
          phone: phone,
          pass: hashedPass,
          user_id: userId,
          user_type: "1",
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw "User Already Exists!";
        }
      }
      if (err instanceof Prisma.PrismaClientInitializationError) {
        throw "Error Connecting to DB";
      }
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },

  validateUser: async (email: string, hashedPass: string) => {
    try {
      return await prisma.user.findUnique({
        where: {
          email: email,
          pass: hashedPass,
        },
        include: {
          Shops: {
            select: {
              shop_id: true,
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

  /* to be refactored and optimized */
  updateUser: async (userId: string, pushTokens: string) => {
    try {
      await prisma.user.update({
        where: {
          user_id: userId,
        },
        data: {
          push_token: pushTokens,
        },
      });
      return 1;
    } catch (err) {
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },

  getUserDetails: async (userId: string) => {
    try {
      const userDetails = await prisma.user.findUnique({
        where: {
          user_id: userId,
        },
      });
      return userDetails;
    } catch (err) {
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },
};

export default UserDbService;
