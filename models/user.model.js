const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String,
        default: "avatar1.png",
        required: true
    },
    chatList: {
        type: Array,
        default: [],
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)