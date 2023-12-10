const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const { register, login } = require("../controller/auth")
const { sendMessage, getMessage } = require("../controller/chat")
const { getAllUser, addChat, getChatList } = require("../controller/user")

router.post("/register", register)
router.post("/login", login)

router.get("/user", getAllUser)
router.post("/chatlist", verifyToken, addChat)
router.get("/chatlist", verifyToken, getChatList)

router.post("/chat", verifyToken, sendMessage)
router.get("/chat", verifyToken, getMessage)

module.exports = router