import login from "./auth/login";
import register from "./auth/register";
import createOrder from "./user/createOrder";
import getMyOrders from "./user/getMyOrders";
import getOrderDetails from "./common/getOrderDetails";
import getPendingOrders from "./owner/getPendingOrders";
import getAllOrders from "./owner/getAllOrders";
import updateOrderStatus from "./owner/updateOrderStatus";
import getUserDetails from "./common/getUserDetails";
import getPerPagePrice from "./common/getPerPagePrice";
import sendEmail from "./mail/sendEmail";

export {
  login,
  register,
  createOrder,
  getMyOrders,
  getOrderDetails,
  getPendingOrders,
  getAllOrders,
  updateOrderStatus,
  getUserDetails,
  getPerPagePrice,
  sendEmail,
};
