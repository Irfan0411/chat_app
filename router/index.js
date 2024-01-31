const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const { register, login } = require("../controller/auth")
const { sendMessage, getMessage, sendImage } = require("../controller/chat")
const { getInfoUser, getAllUser, getAnotherUser, addChat, getChatList, editProfile } = require("../controller/user")
const multerMiddleware = require("../middleware/multer")

router.post("/register", register)
router.post("/login", login)

router.get("/info", verifyToken, getInfoUser)
router.get("/user",verifyToken, getAllUser)
router.get("/user/:userId", getAnotherUser)
router.post("/chatlist", verifyToken, addChat)
router.get("/chatlist/", verifyToken, getChatList)
router.post("/user/update", verifyToken, editProfile)

router.post("/chat", verifyToken, sendMessage)
router.get("/chat/:receiverId", verifyToken, getMessage)
router.post("/chat/image", verifyToken, multerMiddleware.single("file"), sendImage)

module.exports = router