require("dotenv").config();
require("./functions/dbConnect")();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const multer = require("multer");


const app = express();
const PORT = process.env.PORT || 3000


app.use(cookieParser());
// Put these statements before you define any routes.

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer.array());

// db connection
// const {
//     Socket
// } = require("socket.io");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*"
//     }
// })

// app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// importing routers
// msgRouter = require("./routes/messages");
// chatRouter = require("./routes/chats");
adminRouter_Admin = require("./routes/admin-side/admin");
articleRouter_Admin = require("./routes/admin-side/articles");
interestRouter_Admin = require("./routes/admin-side/interests");
reportRouter_Admin = require("./routes/admin-side/reports");
packageRouter_Admin = require("./routes/admin-side/packages");
userRouter_Admin = require("./routes/admin-side/users");

articleRouter_User = require("./routes/user-side/articles");
interestRouter_User = require("./routes/user-side/interests");
reportRouter_User = require("./routes/user-side/reports");
packageRouter_User = require("./routes/user-side/packages");
userRouter_User = require("./routes/user-side/users");


// app.use("/message", msgRouter);
// app.use("/chat", chatRouter);
app.use("/admin-admin", adminRouter_Admin);
app.use("/admin-article", articleRouter_Admin);
app.use("/admin-interest", interestRouter_Admin);
app.use("/admin-report", reportRouter_Admin);
app.use("/admin-package", packageRouter_Admin);
app.use("/admin-user", userRouter_Admin);

app.use("/user-article", articleRouter_User);
app.use("/user-interest", interestRouter_User);
app.use("/user-report", reportRouter_User);
app.use("/user-package", packageRouter_User);
app.use("/user-user", userRouter_User);


app.get("/", (req, res) => {
    res.send("This is a test")
})
// section for middlewares
// auth.js

app.listen(PORT, () => {
    console.log("connected!");
});