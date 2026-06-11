const products =
require('../models/productModel')

// Add Product
exports.addProduct = async (req, res) => {

  try {

    const {
      title,
      description,
      subCategory,
      variants
    } = req.body

    const images =
      req.files.map(file => file.filename)

    const newProduct =
      new products({
        title,
        description,
        subCategory,
        image: images,
        variants: JSON.parse(variants)
      })

    await newProduct.save()

    res.status(200).json(newProduct)

  } catch (err) {
    res.status(500).json(err)
  }

}

// Get Products
exports.getProducts = async (req, res) => {

  try {

    const search =
      req.query.search || ""

    const page =
      Number(req.query.page) || 1

    const limit = 6

    const skip =
      (page - 1) * limit

    const result =
      await products.find({

        title: {
          $regex: search,
          $options: 'i'
        }

      })
      .populate('subCategory')
      .skip(skip)
      .limit(limit)

    const total =
      await products.countDocuments()

    res.status(200).json({
      products: result,
      totalPages:
        Math.ceil(total / limit)
    })

  } catch (err) {
    res.status(500).json(err)
  }

}

// Get Single Product
exports.getSingleProduct = async (req, res) => {

  try {

    const { id } = req.params

    const product =
      await products.findById(id)
      .populate('subCategory')

    res.status(200).json(product)

  } catch (err) {
    res.status(500).json(err)
  }

}

// Update Product
exports.updateProduct = async (req, res) => {

  try {

    const { id } = req.params

    const updatedProduct =
      await products.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      )

    res.status(200).json(updatedProduct)

  } catch (err) {
    res.status(500).json(err)
  }

}