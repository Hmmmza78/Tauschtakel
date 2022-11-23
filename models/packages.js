// msg_id, message, sender, chat_id, time
const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "active"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    }
}, {
    collection: "package",
});

const model = mongoose.model("packageSchema", packageSchema);

module.exports = model;