const express = require('express');

const router = express.Router();

const Deal = require("../models/deals");

router.get("/test", (req, res) => {
    res.send("Deal")
});

router.post("/new", async (req, res) => {
    try {
        let {
            client,
            seller,
            article
        } = req.body;

        try {
            let deal = await Deal.create({
                client,
                seller,
                article
            });
            res.json({
                status: "success"
            });
        } catch (e) {
            res.json({
                ...e,
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




// !this api needs to be reviewed
router.post("/edit", async (req, res) => {
    let {
        id,
        title
    } = req.body;
    try {
        const deal = await Deal.findByIdAndUpdate(
            id, {
                title,
                updatedAt: Date.now()
            }
        );
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json(e.message);
    }
});

router.post("/delete", async (req, res) => {
    try {
        let {
            id,
        } = req.body;
        try {
            const deal = await Deal.findByIdAndDelete(
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
router.get("/allDeals", async (req, res) => {
    try {
        const deals = await Deal.find();
        res.json({
            deals
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
        const deal = await Deal.findById(
            id
        );
        res.json({
            deal
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

module.exports = router;