const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.join(__dirname, "../files"))
    },
    filename: (req, file, cb)=> {
        cb(null, `${Math.random().toString(8).slice(2)}.${file.mimetype.split("/")[1]}`)
    }
})

const multerMiddleware = multer({storage: storage})

module.exports = multerMiddleware