const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    console.log(token);
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
        res.json({ statusCode: 403, message: "authorization failed, please login again" });
        return;
    }
    next();
}

module.exports = {
    authenticateToken
}