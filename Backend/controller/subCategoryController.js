const subCategories =
require('../models/subcategoryModel')

exports.addSubCategory = async (req, res) => {

  try {

    const {
      categoryId,
      subCategoryName
    } = req.body

    const newSubCategory =
      new subCategories({ categoryId, subCategoryName })

    await newSubCategory.save()

    res.status(200).json(newSubCategory)

  } catch (err) {
    res.status(500).json(err)
  }

}

exports.getSubCategories = async (req, res) => {

  try {

    const result =
      await subCategories.find()
       .populate('categoryId')

    res.status(200).json(result)

  } catch (err) {
    res.status(500).json(err)
  }

}