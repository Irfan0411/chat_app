const mongoose = require("mongoose")

const chatlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    conversation: {
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    messagesId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("chatList", chatlistSchema)