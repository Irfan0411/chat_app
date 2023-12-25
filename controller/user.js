const mongoose = require("mongoose")
const User = require("../models/user.model")
const ChatList = require("../models/chatlist.model")

const getInfoUser = (req, res) => {
    res.status(200).json(req.body.user)
}

const getAnotherUser = async (req, res) => {
    // params = {userId}

    try {
        const data = await User.findOne({userId: req.params.userId}).select('userId username email')
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}
const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select('userId username email')
        const data = users.filter(usr => {
            return usr.userId !== req.body.user.userId
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}

const addChat = async (req, res) => {
    // body = {to, username}

    const messagesId = req.body.user.userId > req.body.to
    ? req.body.user.userId + req.body.to
    : req.body.to + req.body.user.userId

    try {
        const sender = new ChatList({
            userId: req.body.user.userId,
            conversation: {
                userId: req.body.to,
                username: req.body.username
            },
            messagesId: messagesId
        })
        const receiver = new ChatList({
            userId: req.body.to,
            conversation: {
                userId: req.body.user.userId,
                username: req.body.user.username
            },
            messagesId: messagesId
        })

        const senderOk = await sender.save()
        const receiverOk = await receiver.save()

        if(senderOk && receiverOk) res.sendStatus(201)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getChatList = async (req, res) => {
    try {
        const chatList = await ChatList
        .find({userId: req.body.user.userId})
        .select('conversation messagesId')
        .exec()
        
        res.status(200).json(chatList)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { getInfoUser, getAllUser, getAnotherUser, addChat, getChatList }