import login from "./auth/login";
import register from "./auth/register";
import createOrder from "./user/createOrder";
import getOrderDetails from "./common/getOrderDetails";
import getOrders from "./common/getOrders";
import getAllOrders from "./owner/getAllOrders";
import updateOrderStatus from "./owner/updateOrderStatus";
import getUserDetails from "./common/getUserDetails";
import getPerPagePrice from "./common/getPerPagePrice";
import sendEmail from "./mail/sendEmail";
import updateOrderPaymentId from "./user/updateOrderPaymentId";

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
};
