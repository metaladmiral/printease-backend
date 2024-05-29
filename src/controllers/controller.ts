import login from "./auth/login";
import register from "./auth/register";
import createOrder from "./user/createOrder";
import getOrderDetails from "./public/getOrderDetails";
import getOrders from "./common/getOrders";
import getAllOrders from "./common/getAllOrders";
import updateOrderStatus from "./owner/updateOrderStatus";
import getUserDetails from "./public/getUserDetails";
import getPerPagePrice from "./public/getPerPagePrice";
import sendEmail from "./mail/sendEmail";
import updateOrderPaymentId from "./user/updateOrderPaymentId";
import updateUserDetails from "./admin/updateUserDetails";

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
