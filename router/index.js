const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const { register, login } = require("../controller/auth")
const { sendMessage, getMessage, sendImage } = require("../controller/chat")
const { getInfoUser, getAllUser, getAnotherUser, addChat, getChatList, editProfile } = require("../controller/user")
const mediaMulter = require("../middleware/media.multer")
const avatarMulter = require("../middleware/avatar.multer")

router.post("/register", register)
router.post("/login", login)

router.get("/info", verifyToken, getInfoUser)
router.get("/user",verifyToken, getAllUser)
router.get("/user/:userId", getAnotherUser)
router.post("/chatlist", verifyToken, addChat)
router.get("/chatlist", verifyToken, getChatList)
router.post("/user/update", verifyToken, editProfile)
router.post("/user/avatar", verifyToken, avatarMulter.single("avatar"), sendImage)

router.post("/chat", verifyToken, sendMessage)
router.get("/chat/:receiverId", verifyToken, getMessage)
router.post("/chat/image", verifyToken, mediaMulter.single("media"), sendImage)

module.exports = router