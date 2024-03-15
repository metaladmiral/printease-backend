const express = require('express')
const {login} = require('./src/controllers')

const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(express.urlencoded({ 
  extended: true
})) 
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/login', (req, res) => {
  login(req, res, process.env.TOKEN_SECRET)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})