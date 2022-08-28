const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    //ang mangyayari dito is = product: [{productId}, {number of products}]
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    //it will contain different lines such as address, zipcxode, number
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
