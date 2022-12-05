const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    authenticateToken
} = require("../../functions/auth");
// router.use(authenticateToken);

const {
    upload
} = require("../../functions/upload")

const User = require("../../models/user");
const {
    append
} = require('express/lib/response');

router.post("/register", async (req, res, next) => {
    try {
        let {
            username,
            email,
            password
        } = req.body;
        password = await bcrypt.hash(password, 15)

        console.log(email);
        User.find({
            $or: [{
                username
            }, {
                email
            }]

        }, async (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);
                if (result.length > 0) {
                    res.json({
                        status: "fail",
                        message: "User already exists!"
                    });
                } else {
                    try {
                        const user = await User.create({
                            email,
                            username,
                            password
                        });
                        const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET);
                        res.json({
                            status: "success",
                            user,
                            token
                        })
                    } catch (error) {
                        res.json(error.message);
                    }
                }
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/login", async (req, res) => {
    try {
        let {
            username,
            password
        } = req.body;
        console.log(username, password);
        User.findOne({
            username
        }, async (err, result) => {
            if (err) throw err;
            // console.log(result);
            if (result != null) {
                if (await bcrypt.compare(password, result.password)) {
                    const token = jwt.sign(result.id, process.env.ACCESS_TOKEN_SECRET);
                    // res.cookie("token", token, {
                    //     httpOnly: true
                    // }).json({
                    res.cookie("token", token, {
                        httpOnly: true
                    }).json({
                        status: "success",
                        user: result,
                        token
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
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/checkUsername", async (req, res) => {
    try {
        let {
            username
        } = req.body;
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/updatePassword", authenticateToken, async (req, res) => {
    try {
        let {
            uid,
            password
        } = req.body;
        try {
            password = await bcrypt.hash(password, 15);
            response = await User.findByIdAndUpdate(uid, {
                password,
                updatedAt: Date.now()
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/block", async (req, res) => {
    try {
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
            uid,
            username,
            email
        } = req.body;
        try {
            response = await User.findByIdAndUpdate(uid, {
                username,
                email,
                updatedAt: Date.now()
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
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.post("/buyPackage", authenticateToken, async (req, res) => {
    try {
        let {
            package,
            uid
        } = req.body;
        try {
            response = await User.findByIdAndUpdate(uid, {
                packages
            });
        } catch (e) {
            res.json({
                status: "fail",
                "message": e.message
            });
        }
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
});

router.get("/allUsers", authenticateToken, async (req, res) => {
    try {
        users = await User.find();
        users.forEach(user => {
            user.password = "";
        });
        res.json({
            users
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
    }
});

router.get("/premiumUsers", authenticateToken, async (req, res) => {
    try {
        users = await User.find({
            'packages': {
                $exists: true
            }
        });
        users.forEach(user => {
            user.password = "";
        });
        res.json({
            users
        });
    } catch (e) {
        res.json({
            status: "internal server error!"
        });
    }
});

router.get("/logout", authenticateToken, (req, res) => {
    res.cookie("token", "", {
        httpOnly: true
    }).json({
        status: "Under development"
    });
});

// this block must be at the end
router.get("/:id", async (req, res) => {
    try {
        let {
            id
        } = req.params;
        user = await User.findById(id);
        user.password = "";
        res.json({
            user
        });
    } catch (e) {
        res.status(400).json({
            status: "fail",
            message: "provide the correct parameters"
        }).end();
    }
})

// section for middlewares


module.exports = router;