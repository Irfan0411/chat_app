const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    message: {
        text: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        }
    },
    messagesId: {
        type: String,
        required: true
    },
    isReceived: Boolean
}, {timestamps: true})

module.exports = mongoose.model("chat", chatSchema)