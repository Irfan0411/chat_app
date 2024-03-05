const mongoose = require("mongoose")
const Chat = require("../models/chat.model")
const User = require("../models/user.model")

const sendMessage = async (req, res) => {
    // body = {message, to}

    
    try {
        const idMessages = req.body.user.userId > req.body.to
                         ? req.body.user.userId + req.body.to
                         : req.body.to + req.body.user.userId

        const newChat = new Chat({
            senderId: req.body.user.userId,
            message: req.body.message,
            messagesId: idMessages,
        })

        const chat = await newChat.save()
        const {_id, __v, messagesId, updatedAt, ...data} = chat._doc

        global.io.to(req.body.to).emit('chat', {...data, receiverId: req.body.to})
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
        console.log(err);
    }
}

const getMessage = async (req, res) => {
    const messagesId = req.body.user.userId > req.params.receiverId
    ? req.body.user.userId + req.params.receiverId
    : req.params.receiverId + req.body.user.userId

    try {
        const chats = await Chat
        .find({messagesId})
        .select('message senderId createdAt').exec()

        if(chats.length === 0) {
            res.status(404).json({msg: "messages not found"})
            return;
        }
        res.status(200).json(chats)
    } catch (err) {
        res.status(500).json(err)
    }
}

const sendImage = async (req, res) => {
    const file = req.file.filename
    if (!file) {
        res.status(400).json({msg: "no file selected"})
        return;
    }
    res.status(200).json({filename: file})
}

module.exports = { sendMessage, getMessage, sendImage }