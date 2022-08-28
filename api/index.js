const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const authRoute = require('./routes/auth')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const cors = require('cors')
const app = express()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successful'))
  .catch((err) => {
    console.log(err)
  })

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend Server is Running at: http://localhost:5000`)
})
