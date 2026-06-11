const wishlist =
require('../models/whishlistModel')

// Add Wishlist
exports.addWishlist = async (req, res) => {

  try {

    const { productId } = req.body

    const existingItem =
      await wishlist.findOne({
        userId: req.userId,
        productId
      })

    if (existingItem) {
      return res.status(406)
      .json("Already in wishlist")
    }

    const newWishlistItem =
      new wishlist({
        userId: req.userId,
        productId
      })

    await newWishlistItem.save()

    res.status(200).json(newWishlistItem)

  } catch (err) {
    res.status(500).json(err)
  }

}

// Get Wishlist
exports.getWishlist = async (req, res) => {

  try {

    const result =
      await wishlist.find({
        userId: req.userId
      })
      .populate('productId')

    res.status(200).json(result)

  } catch (err) {
    res.status(500).json(err)
  }

}

// Remove Wishlist
exports.removeWishlist = async (req, res) => {

  try {

    const { id } = req.params

    await wishlist.findByIdAndDelete(id)

    res.status(200).json("Removed")

  } catch (err) {
    res.status(500).json(err)
  }

}