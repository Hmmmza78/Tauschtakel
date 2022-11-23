const express = require('express');

const router = express.Router();

const Report = require("../models/reports");

router.get("/test", (req, res) => {
    res.send("Report")
});

router.post("/new", async (req, res) => {
    let {
        title,
        description,
        uid,
        articleId
    } = req.body;
    try {
        let report = await Report.create({
            title,
            description,
            uid,
            articleId
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


router.get("/allReports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.json({
            reports
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
        const report = await Report.findById(
            id
        );
        res.json({
            report
        });
    } catch (e) {
        res.json(e.message);
    }
});

module.exports = router;