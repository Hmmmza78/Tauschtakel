// msg_id, message, sender, chat_id, time
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    image: {
        type: String,
        required: true,
        maxLength: 5
    },
    uid: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true,
        maxLength: 200
    },
    status: {
        type: String,
        required: true,
        default: "pending"
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
    collection: "articles",
});

const model = mongoose.model("articleSchema", articleSchema);

module.exports = model;