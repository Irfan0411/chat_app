const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.join(__dirname, "../files/avatar"))
    },
    filename: (req, file, cb)=> {
        cb(null, file.originalname)
    }
})

const multerMiddleware = multer({storage: storage})

module.exports = multerMiddleware