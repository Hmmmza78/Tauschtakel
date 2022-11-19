
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (e) {
        res.redirect("/login");
    }
    next();
}