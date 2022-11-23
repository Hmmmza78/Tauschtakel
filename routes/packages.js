const express = require('express');

const router = express.Router();

const Package = require("../models/packages");

router.get("/test", (req, res) => {
    res.send("packages")
});

router.post("/new", async (req, res) => {
    let {
        title,
        description,
        price,
        duration
    } = req.body;
    Package.find({
        title
    }, async (err, result) => {
        if (err) {
            res.statusCode(500).end();
            return
        }
        if (result.length > 0) {
            res.json({
                status: "fail",
                message: "Package already exists!"
            }).end();
            return;
        }
        try {
            let package = await Package.create({
                title,
                description,
                price,
                duration
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

router.post("/pause", async (req, res) => {
    let {
        id,
    } = req.body;
    try {
        const package = await Package.findByIdAndUpdate(
            id, {
                status: "paused",
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

router.post("/resume", async (req, res) => {
    let {
        id,
    } = req.body;
    try {
        const package = await Package.findByIdAndUpdate(
            id, {
                status: "active",
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

router.post("/edit", async (req, res) => {
    let {
        id,
        title,
        description,
        price,
        duration
    } = req.body;
    try {
        const package = await Package.findByIdAndUpdate(
            id, {
                title,
                description,
                price,
                duration,
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
        const package = await Package.findByIdAndDelete(
            id
        );
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json(e.message);
    }
});

router.get("/allPackages", async (req, res) => {
    try {
        const packages = await Package.find();
        res.json({
            packages
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
        const package = await Package.findById(
            id
        );
        res.json({
            package
        });
    } catch (e) {
        res.json(e.message);
    }
});

module.exports = router;