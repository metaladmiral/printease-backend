import login from "./auth/login"
import register from "./auth/register"
import createOrder from "./user/createOrder"
import getMyOrders from "./user/getMyOrders"
import getOrderDetails from "./user/getOrderDetails"
import getPendingOrders from "./owner/getPendingOrders"
import getAllOrders from "./owner/getAllOrders"
import updateOrderStatus from "./owner/updateOrderStatus"
import getUserDetails from "./superadmin/getUserDetails"
import getPerPagePrice from "./superadmin/getPerPagePrice"

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
    getPerPagePrice
}