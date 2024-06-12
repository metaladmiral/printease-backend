import express, { Express, Request, Response, response } from "express";
import enva from "dotenv";
import {
  login,
  register,
  createOrder,
  getOrderDetails,
  getOrders,
  updateOrderStatus,
  getUserDetails,
  getPerPagePrice,
  sendEmail,
  updateOrderPaymentId,
  updateUserDetails,
  getShopDetails,
  getShops,
} from "./controllers/controller";
import {
  jwtMiddleware,
  uploadMiddleware,
  ownerMiddleware,
} from "./middleware/middlewares";
import cors from "cors";

enva.config();

const app: Express = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

if (!process.env.JWT_TOKEN_SECRET) {
  response.status(500).send("Internal Server Error");
  process.exit(1);
}

app.use(cors());
app.use("/user", jwtMiddleware(process.env.JWT_TOKEN_SECRET));
app.use("/common", jwtMiddleware(process.env.JWT_TOKEN_SECRET));
app.use(
  "/owner",
  jwtMiddleware(process.env.JWT_TOKEN_SECRET),
  ownerMiddleware(process.env.JWT_TOKEN_SECRET)
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.post("/login", (req: Request, res: Response) => {
  login(req, res, process.env.JWT_TOKEN_SECRET);
});
app.post("/register", (req: Request, res: Response) => {
  register(req, res);
});

/* User APIs */
app.post(
  "/user/create-order",
  uploadMiddleware(),
  (req: Request, res: Response) => {
    createOrder(req, res);
  }
);
app.post("/user/update-order-payment-id", (req: Request, res: Response) => {
  updateOrderPaymentId(req, res);
});

/* Owner APIs */
app.post("/owner/update-order-status", (req: Request, res: Response) => {
  updateOrderStatus(req, res);
});

/* Public APiS (Not requires JWT) */
app.post("/send-create-order-mail", (req: Request, res: Response) => {
  sendEmail(req, res);
});
app.get("/get-per-page-price", (req: Request, res: Response) => {
  getPerPagePrice(req, res);
});
app.get("/get-order-details", (req: Request, res: Response) => {
  getOrderDetails(req, res);
});

/* Common APis (Requires JWT for either owner or user) */
app.get("/common/get-user-details", (req: Request, res: Response) => {
  getUserDetails(req, res);
});
app.post("/common/get-pending-orders", (req: Request, res: Response) => {
  getOrders(req, res, "ORDER_PENDING");
});
app.post("/common/get-prepared-orders", (req: Request, res: Response) => {
  getOrders(req, res, "ORDER_PREPARED");
});
app.post("/common/get-picked-orders", (req: Request, res: Response) => {
  getOrders(req, res, "ORDER_PICKED");
});
app.post("/common/get-all-orders", (req: Request, res: Response) => {
  getOrders(req, res);
});

/* Admin APIs */
app.post("/admin/update-user-details", (req: Request, res: Response) => {
  updateUserDetails(req, res);
});
app.get("/admin/get-user-details", (req: Request, res: Response) => {
  getUserDetails(req, res, true);
});
app.get("/admin/get-all-shops", (req: Request, res: Response) => {
  getShops(req, res);
});
app.get("/admin/get-shop-details", (req: Request, res: Response) => {
  getShopDetails(req, res);
});

export default app;
