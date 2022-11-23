// msg_id, message, sender, chat_id, time
const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
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
    collection: "deals",
});

const model = mongoose.model("dealSchema", dealSchema);

module.exports = model;