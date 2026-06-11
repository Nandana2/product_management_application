const categories = require('../models/categoryModel')

// Add Category
exports.addCategory = async (req, res) => {

  try {

    const { categoryName } = req.body
    const existingCategory =
      await categories.findOne({categoryName})

    if (existingCategory) {
      return res.status(406).json("Category already exists")
    }
    const newCategory = new categories({ categoryName })

    await newCategory.save()

    res.status(200).json(newCategory)

  } catch (err) {
    res.status(500).json(err)
  }

}

// Get Categories
exports.getCategories = async (req, res) => {

  try {
    const allCategories =
      await categories.find()
    res.status(200).json(allCategories)

  } catch (err) {
    res.status(500).json(err)
  }

}