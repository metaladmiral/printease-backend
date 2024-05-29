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
      await prisma.user.create({
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
      });
    } catch (err) {
      throw err;
    } finally {
      prisma.$disconnect;
    }
  },

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
};

export default UserDbService;
