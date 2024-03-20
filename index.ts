import express, { Express, Request, Response } from "express";
import enva from 'dotenv';
import {login, register} from "./src/controller"

enva.config();

const app: Express = express()
app.use(express.urlencoded({ 
  extended: true
}))   

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.post('/login', (req: Request, res: Response) => {
  login(req, res, process.env.JWT_TOKEN_SECRET || "12")
})
app.post('/register', (req: Request, res: Response) => {
  register(req, res)
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})