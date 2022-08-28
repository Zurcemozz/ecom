const router = require('express').Router()
const {
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require('./verifyToken')
const Cart = require('../Models/Cart')

//CREATE

router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body)

  try {
    const savedCart = await newCart.save()
    res.status(200).json(savedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Update Cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updateCart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete product
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json('Cart Deleted')
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET USER CART
router.get('/find/:userOd', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET ALL \

router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
