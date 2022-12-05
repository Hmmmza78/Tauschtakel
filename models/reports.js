// msg_id, message, sender, chat_id, time
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true,
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
    collection: "reports",
});

const model = mongoose.model("reportSchema", reportSchema);

module.exports = model;