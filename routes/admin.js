const express = require('express');

const router = express.Router();

const Article = require("../models/articles");
const Deal = require("../models/deals");
const User = require("../models/user");

router.get("/meta", async (req, res) => {
    try {
        const articles = await Article.find().countDocuments();
        const pendingArticles = await Article.find({
            status: "pending"
        }).countDocuments();
        const users = await User.find().countDocuments();
        const deals = await Deal.find().countDocuments();

        res.json({
            articles,
            users,
            deals,
            pendingArticles
        });
    } catch (err) {}
})

module.exports = router;