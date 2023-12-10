const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const { register, login } = require("../controller/auth")
const { sendMessage, getMessage } = require("../controller/chat")

router.post("/register", register)
router.post("/login", login)

router.post("/chat", verifyToken, sendMessage)
router.get("/chat", verifyToken, getMessage)

module.exports = router