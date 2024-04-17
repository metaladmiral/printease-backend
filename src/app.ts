import express, { Express, Request, Response } from "express";
import enva from 'dotenv';
import {login, register, createOrder, getMyOrders, getOrderDetails, getPendingOrders, updateOrderStatus, getAllOrders} from "./controller"
import {jwtMiddleware, uploadMiddleware, ownerMiddleware} from "./middleware/middlewares"
// import upload from './middleware/fileMiddleware';

enva.config();

const app: Express = express()
app.use(express.urlencoded({ 
  extended: true
}))   

app.use('/user', jwtMiddleware(process.env.JWT_TOKEN_SECRET || "Invalid Token"))
app.use('/owner', ownerMiddleware(process.env.JWT_TOKEN_SECRET || "Invalid Token"))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.post('/login', (req: Request, res: Response) => {
  login(req, res, process.env.JWT_TOKEN_SECRET || "12")
})
app.post('/register', (req: Request, res: Response) => {
  register(req, res)
})

/* User APIs */
app.post('/user/create-order', uploadMiddleware.single('file'), (req: Request, res: Response) => {
  createOrder(req, res)
})

app.get('/user/my-orders', (req: Request, res: Response) => {
  getMyOrders(req, res)
})

app.get('/user/get-order-details', (req: Request, res: Response) => {
  getOrderDetails(req, res)
})


/* Owner APIs */ 
app.get('/owner/get-pending-orders', (req: Request, res: Response) => {
  getPendingOrders(req, res)
})
app.post('/owner/get-all-orders', (req: Request, res: Response) => {
  getAllOrders(req, res)
})
app.post('/owner/update-order-status', (req: Request, res: Response) => {
  updateOrderStatus(req, res)
})

export default app;