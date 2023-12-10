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
    password: {
        type: String,
        required: true
    },
    chatList: {
        type: Array,
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema)