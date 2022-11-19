// msg_id, message, sender, chat_id, time
const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
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
    collection: "interests",
});

const model = mongoose.model("interestSchema", interestSchema);

module.exports = model;