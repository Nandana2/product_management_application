const express = require('express')

const router = express.Router()

// Controllers
const authController = require('../controller/authController')
const categoryController = require('../controller/categoryController')
const subCategoryController = require('../controller/subCategoryController')
const productController = require('../controller/productController')
const wishlistController = require('../controller/wishlistController')

// Middleware
const jwtMiddleware = require('../middleware/jwtMiddleware')
const upload = require('../middleware/multerMiddleware')


// ================= AUTH =================

// Register
router.post('/register', authController.register)

// Login
router.post('/login', authController.login)


// ================= CATEGORY =================

// Add Category
router.post(
    '/category',
    jwtMiddleware,
    categoryController.addCategory
)

// Get Categories
router.get(
    '/category',
    categoryController.getCategories
)


// ================= SUB CATEGORY =================

// Add Sub Category
router.post(
    '/subcategory',
    jwtMiddleware,
    subCategoryController.addSubCategory
)

// Get Sub Categories
router.get(
    '/subcategory',
    subCategoryController.getSubCategories
)


// ================= PRODUCT =================

// Add Product
router.post(
    '/product',
    jwtMiddleware,
    upload.array('image', 5),
    productController.addProduct
)

// Get Products
router.get(
    '/products',
    productController.getProducts
)

// Get Single Product
router.get(
    '/product/:id',
    productController.getSingleProduct
)

// Update Product
router.put(
    '/product/:id',
    jwtMiddleware,
    productController.updateProduct
)


// ================= WISHLIST =================

// Add Wishlist
router.post(
    '/wishlist',
    jwtMiddleware,
    wishlistController.addWishlist
)

// Get Wishlist
router.get(
    '/wishlist',
    jwtMiddleware,
    wishlistController.getWishlist
)

// Delete Wishlist Item
router.delete(
    '/wishlist/:id',
    jwtMiddleware,
    wishlistController.removeWishlist
)


// Test Route
router.get('/', (req, res) => {
    res.status(200).json('API Working')
})

module.exports = router