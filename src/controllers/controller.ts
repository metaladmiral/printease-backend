import login from "./auth/login";
import register from "./auth/register";
import createOrder from "./order/createOrder";
import getOrderDetails from "./order/getOrderDetails";
import getOrders from "./order/getOrders";
import getAllOrders from "./order/getAllOrders";
import updateOrderStatus from "./order/updateOrderStatus";
import getUserDetails from "./user/getUserDetails";
import getPerPagePrice from "./misc/getPerPagePrice";
import sendEmail from "./mail/sendEmail";
import updateOrderPaymentId from "./order/updateOrderPaymentId";
import updateUserDetails from "./user/updateUserDetails";

export {
  login,
  register,
  createOrder,
  getOrderDetails,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  getUserDetails,
  getPerPagePrice,
  sendEmail,
  updateOrderPaymentId,
  updateUserDetails,
};
