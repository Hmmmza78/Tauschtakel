const express = require('express');

const router = express.Router();

const Interest = require("../models/interests");

router.get("/test", (req, res) => {
    res.send("Interest")
});

router.post("/new", async (req, res) => {
    let {
        title,
    } = req.body;
    Interest.find({
        title
    }, async (err, result) => {
        if (err) {
            res.statusCode(500).end();
            return
        }
        if (result.length > 0) {
            res.json({
                status: "fail",
                message: "Interest already exists!"
            }).end();
            return;
        }
        try {
            let interest = await Interest.create({
                title,
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
});


router.get("/allInterests", async (req, res) => {
    try {
        const interests = await Interest.find();
        // console.log(interests);
        res.json({
            interests
        });
    } catch (e) {
        res.json(e.message);
    }
});


router.post("/edit", async (req, res) => {
    let {
        id,
        title
    } = req.body;
    try {
        const interest = await Interest.findByIdAndUpdate(
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
        const interest = await Interest.findByIdAndDelete(
            id
        );
        res.json({
            status: "success"
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
        const interest = await Interest.findById(
            id
        );
        res.json({
            interest
        });
    } catch (e) {
        res.json(e.message);
    }
});

module.exports = router;