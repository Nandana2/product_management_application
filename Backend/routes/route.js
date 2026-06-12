const express = require('express')

const router = express.Router()

const authController = require('../controller/authController')
const categoryController = require('../controller/categoryController')
const subCategoryController = require('../controller/subCategoryController')
const productController = require('../controller/productController')
const wishlistController = require('../controller/wishlistController')

const jwtMiddleware = require('../middleware/jwtMiddleware')
const upload = require('../middleware/multerMiddleware')


// Auth
router.post('/register', authController.register)
router.post('/login', authController.login)


// Category
router.post(
    '/category',
    jwtMiddleware,
    categoryController.addCategory
)

router.get(
    '/category',
    categoryController.getCategories
)


// Subcategory
router.post(
    '/subcategory',
    jwtMiddleware,
    subCategoryController.addSubCategory
)

router.get(
    '/subcategory',
    subCategoryController.getSubCategories
)


// Product
router.post(
    '/product',
    jwtMiddleware,
    upload.array('image', 5),
    productController.addProduct
)

router.get(
    '/products',
    productController.getProducts
)

router.get(
    '/product/:id',
    productController.getSingleProduct
)

router.put(
    '/product/:id',
    jwtMiddleware,
    productController.updateProduct
)


// Wishlist
router.post(
    '/wishlist',
    jwtMiddleware,
    wishlistController.addWishlist
)

router.get(
    '/wishlist',
    jwtMiddleware,
    wishlistController.getWishlist
)

router.delete(
    '/wishlist/:id',
    jwtMiddleware,
    wishlistController.removeWishlist
)

router.get('/', (req, res) => {
    res.status(200).json('API Working')
})

module.exports = router