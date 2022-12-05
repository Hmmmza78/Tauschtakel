const express = require('express');

const router = express.Router();
const {
    authenticateToken
} = require("../../functions/auth");
router.use(authenticateToken);

// router.use(express.json());

const Interest = require("../../models/interests");

router.get("/test", (req, res) => {
    res.send("Interest")
});

router.post("/new", async (req, res) => {
    try {
        let {
            title,
        } = req.body;
        console.log(req.body);
        Interest.find({
            title
        }, async (err, result) => {
            if (err) {
                res.statusCode(500).end();
                return
            }
            console.log(result);
            if (result.length) {
                console.log(result[0].title);
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
                    status: "success",
                    interest
                });
            } catch (e) {
                res.json({
                    ...e,
                    status: "fail"
                });
            }
        });

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
            id,
        } = req.body;
        console.log(req.body);
        if (Object.keys(req.body).length === 0) {
            console.log("empty body");
            res.json({status: "fail", message: "empty body"}).statusCode(400).end();
        }
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
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
// following block must be at the end
router.get("/:id", async (req, res) => {
    try {
        let {
            id
        } = req.params;
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
