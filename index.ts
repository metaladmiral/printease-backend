import express, { Express, Request, Response } from "express";
import enva from 'dotenv';
import {login, register, createOrder, getMyOrders, getOrderDetails} from "./src/controller"
import {jwtMiddleware, uploadMiddleware} from "./src/middleware/middlewares"
// import upload from './src/middleware/fileMiddleware';

enva.config();

const app: Express = express()
app.use(express.urlencoded({ 
  extended: true
}))   

app.use('/order', jwtMiddleware(process.env.JWT_TOKEN_SECRET || "Invalid Token"))

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
app.post('/order/create-order', uploadMiddleware.single('file'), (req: Request, res: Response) => {
  createOrder(req, res)
})

app.get('/order/my-orders', (req: Request, res: Response) => {
  getMyOrders(req, res)
})

app.get('/order/get-order-details', (req: Request, res: Response) => {
  getOrderDetails(req, res)
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})