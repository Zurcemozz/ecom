const router = require('express').Router()
const {
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require('./verifyToken')
const Order = require('../Models/Order')

//CREATE

router.post('/', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body)

  try {
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Update Cart
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updateOrder)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete product
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json('Order Deleted')
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET USER ORders
router.get('/find/:userOd', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET ALL

router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/income', verifyTokenAdmin, async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      //returns all json file regarding dun sa created date (createdAt), after nun, i compare siya sa previous monthj
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: '$createdAt' }, sales: '$amount' } },
      { $group: { _id: '$month', total: { $sum: '$sales' } } },
    ])
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
