const User = require("../models/user.model")

const getInfoUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.user._id).select('-createdAt -updatedAt -__v -password')
        if (user) res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getAnotherUser = async (req, res) => {
    // params = {userId}

    try {
        const data = await User.findOne({userId: req.params.userId}).select('userId username email avatar')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}
const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('userId username email avatar')
        const data = users.filter(usr => {
            return usr.userId !== req.body.user.userId
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}

const addChat = async (req, res) => {
    // body = {to}

    try {
        const chatListSender = await User.findById(req.body.user._id).select('chatList')
        const newChatListSender = [...chatListSender.chatList, req.body.to]
        const sender = await User.findByIdAndUpdate(req.body.user._id, {chatList: newChatListSender})

        const chatLlistReceiver = await User.findOne({userId: req.body.to}).select('chatList')
        const newChatListReceiver = [...chatLlistReceiver.chatList, req.body.user.userId]
        const receiver = await User.findOneAndUpdate({userId: req.body.to}, {chatList: newChatListReceiver})

        if(sender && receiver) {
            global.io.to(req.body.to).emit("newChat", req.body.user)
            res.sendStatus(201)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

const getChatList = async (req, res) => {
    try {
        const chatList = await User
        .find({userId: {$in: req.query.chatList}})
        .select('username userId avatar')
        .exec()
        
        res.status(200).json(chatList)
    } catch (err) {
        res.status(500).json(err)
    }
}

const editProfile = async (req, res) => {
    try {
        const update = {
            username: req.body.username,
            avatar: req.body.avatar
        }
         const doc = await User.findByIdAndUpdate(req.body.user._id, update)
         await doc.save()
         res.status(200).json({msg: "updated"})
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { getInfoUser, getAllUser, getAnotherUser, addChat, getChatList, editProfile }