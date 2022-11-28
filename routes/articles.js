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
    try {
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});
router.post("/edit", async (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});
router.post("/approve", async (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});
router.post("/reject", async (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});
router.post("/delete", async (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
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
router.post("/userArticles", async (req, res) => {
    try {
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
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
    try {
        let {
            id
        } = req.params;
        const article = await Article.findById(
            id
        );
        res.json({
            article
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

module.exports = router;