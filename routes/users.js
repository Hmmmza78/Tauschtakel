const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    upload
} = require("../functions/upload")

const User = require("../models/user");
const {
    append
} = require('express/lib/response');

router.post("/register", async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    password = await bcrypt.hash(password, 15)

    User.find({
        $or: [{
            username,
            email
        }]

    }, async (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                res.json({
                    status: "fail",
                    message: "User already exists!"
                });
            } else {
                try {
                    const response = await User.create({
                        email,
                        username,
                        password
                    });
                    res.json({
                        status: "success",
                    })
                } catch (error) {
                    res.json(error.message);
                }
            }
        }
    });
});


router.post("/login", async (req, res) => {
    let {
        username,
        password
    } = req.body;
    User.findOne({
        username
    }, async (err, result) => {
        if (err) throw err;
        // console.log(result);
        if (result != null) {
            if (await bcrypt.compare(password, result.password)) {
                const token = jwt.sign(result.id, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("token", token, {
                    httpOnly: true
                }).json({
                    status: "success"
                });
            } else {
                res.json({
                    status: "fail",
                    message: "Incorrect password!"
                });
            }
        } else {
            res.send("User does not exist!")
        }
    })
});

router.post("/user/check", async (req, res) => {
    let username = req.body.username;
    let nameOld = await User.find({
        name: username
    });
    if (nameOld.length > 0) {
        res.json({
            status: "username already exists!"
        });
    } else {
        res.json({
            status: "success"
        });
    }
});

router.post("/user/updatePassword", upload.single("image"), async (req, res) => {
    let {
        uid,
        password
    } = req.body;
    try {
        password = await bcrypt.hash(password, 15);
        response = await User.findByIdAndUpdate(uid, {
            password
        });
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
        console.log(e);
    }
});

router.post("/user/block", async (req, res) => {
    let {
        uid
    } = req.body;
    try {

        response = await User.findByIdAndUpdate(uid, {
            blocked: true
        });
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
        console.log(e);
    }
});

router.post("/user/updateInfo", async (req, res) => {
    let {
        uid,
        username,
        email
    } = req.body;
    try {
        response = await User.findByIdAndUpdate(uid, {
            username,
            email
        });
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
        console.log(e);
    }
});

router.post("/user/delete", async (req, res) => {
    let {
        uid
    } = req.body;
    try {
        response = await User.findByIdAndDelete(uid);
        res.json({
            status: "success"
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
        console.log(e);
    }
});

router.get("/allUsers", async (req, res) => {
    try {
        response = await User.find();
        res.json({ response });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
    }
})

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true
    }).json({
        status: "Under development"
    });
});

// section for middlewares


module.exports = router;