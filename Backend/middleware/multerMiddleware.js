const multer = require('multer')
const path = require('path')

// Storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname)

        cb(null, uniqueName)
    }

})

// File filter
const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/webp'
    ) {
        cb(null, true)
    }
    else {
        cb(new Error("Only images are allowed"), false)
    }
}

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload