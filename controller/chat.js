const mongoose = require("mongoose")
const Chat = require("../models/chat.model")
const User = require("../models/user.model")

const sendMessage = async (req, res) => {

    const messagesId = req.body.user.userId > req.body.to
                     ? req.body.user.userId + req.body.to
                     : req.body.to + req.body.user.userId

    try {
        const newChat = new Chat({
            senderId: req.body.userId,
            message: req.body.message,
            messagesId: messagesId,
            isReceived: false
        })

        const chat = await newChat.save()
        const {_id, __v, ...data} = chat._doc
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getMessage = async (req, res) => {
    try {
        const chats = await Chat
        .find({messagesId: req.body.messagesId, isReceived: false})
        .select('-_id -isReceived -createdAt').exec()

        if(chats.length === 0) res.status(404).json({msg: "messages not found"})
        res.status(200).json(chats)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { sendMessage, getMessage }