const router = require('express').Router()
const {
  verifyTokenAndAuthorization,
  verifyTokenAdmin,
} = require('./verifyToken')
const Product = require('../Models/Product')

//CREATE

router.post('/', verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body)

  try {
    const savedProduct = await newProduct.save()
    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Update Pr
router.put('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProuct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedProuct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//delete product

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('Product Deleted')
  } catch (error) {
    res.status(500).json(error)
  }
})

//specific product
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET ALL PRODUCT
router.get('/', async (req, res) => {
  const queryNew = req.query.new
  const queryCategory = req.query.category

  try {
    let products

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      })
    } else {
      products = await Product.find()
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
