const products =
require('../models/productModel')

exports.addProduct = async (req, res) => {

  try {

    const {
      title,
      subCategory,
      description,
      variants
    } = req.body

    const images = req.files
      ? req.files.map(file => file.filename)
      : []

    const newProduct = new products({
      title,
      subCategory,
      description,
      variants: JSON.parse(variants),
      image: images
    })

    await newProduct.save()

    res.status(200).json(newProduct)

  } catch (err) {

  console.log(err)

  res.status(500).json({
    message: err.message
  })

}

}

exports.getProducts = async (req, res) => {

  try {

    const { search, subCategory, page = 1, limit = 10 } = req.query

    const filter = {}

    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }

    if (subCategory) {
      if (subCategory.includes(',')) {
        filter.subCategory = { $in: subCategory.split(',') }
      } else {
        filter.subCategory = subCategory
      }
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)

    const total = await products.countDocuments(filter)

    const productList = await products.find(filter)
      .populate('subCategory')
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)

    res.status(200).json({
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: productList
    })

  } catch (err) {
    res.status(500).json(err)
  }

}

exports.getSingleProduct = async (req, res) => {

  try {

    const { id } = req.params

    const product =
      await products.findById(id).populate('subCategory')

    res.status(200).json(product)

  } catch (err) {
    res.status(500).json(err)
  }

}

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