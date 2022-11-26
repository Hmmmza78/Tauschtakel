const express = require('express')
const {
    upload
} = require("../functions/upload")

const router = express.Router();

const Article = require("../models/articles");
const User = require("../models/user");

router.get("/test", (req, res) => {
    res.send("Article")
});
router.post("/new", upload.single("image"), async (req, res) => {
    let {
        title,
        description,
        uid,
        category,
        status,
        condition,
        price,
        zip
    } = req.body;
    try {
        let article = await Article.create({
            title,
            description,
            image: newFileName,
            uid,
            category,
            status,
            condition,
            price,
            zip
        });
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json(e);
    }
});
router.get("/pendingArticles", async (req, res) => {
    try {
        const articles = await Article.find({
            status: "pending"
        });
        res.json({
            articles
        });
    } catch (e) {
        res.json(e.message);
    }
});
router.get("/approvedArticles", async (req, res) => {
    try {
        const articles = await Article.find({
            status: "approved"
        });
        res.json({
            articles
        });
    } catch (e) {
        res.json(e.message);
    }
});
router.get("/userArticles", async (req, res) => {
    let {
        uid
    } = req.body;
    try {
        const articles = await Article.find({
            uid
        });
        res.json({
            articles
        });
    } catch (e) {
        res.json(e.message);
    }
});
router.post("/edit", async (req, res) => {
    let {
        id,
        title,
        description,
        category,
        condition,
        price,
        zip
    } = req.body;
    try {
        await Article.findByIdAndUpdate(
            id, {
                title,
                description,
                category,
                condition,
                price,
                zip,
                updatedAt: Date.now()
            }
        );
        res.json({
            status: "success",
            message: "Article successfully updated"
        });
    } catch (e) {
        res.json({
            ...e.message,
            status: "fail"
        });
    }
});
router.post("/approve", async (req, res) => {
    let {
        id,
    } = req.body;
    try {
        await Article.findByIdAndUpdate(
            id, {
                status: "approved",
            }
        );
        res.json({
            status: "success",
            message: "Article successfully approved"
        });
    } catch (e) {
        res.json({
            ...e.message,
            status: "fail"
        });
    }
});
router.post("/reject", async (req, res) => {
    let {
        id,
    } = req.body;
    try {
        await Article.findByIdAndUpdate(
            id, {
                status: "rejected",
            }
        );
        res.json({
            status: "success",
            message: "Article successfully rejected"
        });
    } catch (e) {
        res.json({
            ...e.message,
            status: "fail"
        });
    }
});
router.post("/delete", async (req, res) => {
    let {
        id
    } = req.body;
    try {
        await Article.findByIdAndDelete(
            id
        );
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json(e.message);
    }
});
router.get("/allArticles", async (req, res) => {
    try {
        const articles = await Article.find();
        // console.log(articles);
        res.json({
            articles
        });
    } catch (e) {
        res.json(e.message);
    }
});
// following block must be at the end
router.get("/:id", async (req, res) => {
    let {
        id
    } = req.params;
    try {
        const article = await Article.findById(
            id
        );
        res.json({
            article
        });
    } catch (e) {
        res.json(e.message);
    }
});

module.exports = router;