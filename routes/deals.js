const express = require('express');

const router = express.Router();

const Deal = require("../models/deals");

router.get("/test", (req, res) => {
    res.send("Deal")
});

router.post("/new", async (req, res) => {
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
    let {
        id
    } = req.params;
    try {
        const deal = await Deal.findById(
            id
        );
        res.json({
            deal
        });
    } catch (e) {
        res.json(e.message);
    }
});

module.exports = router;