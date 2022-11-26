require("dotenv").config();
require("./functions/dbConnect")();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// db connection
// const {
//     Socket
// } = require("socket.io");

const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//         origin: "*"
//     }
// })

app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cookieParser());

// importing routers
// msgRouter = require("./routes/messages");
// chatRouter = require("./routes/chats");
adminRouter = require("./routes/admin");
articleRouter = require("./routes/articles");
interestRouter = require("./routes/interests");
reportRouter = require("./routes/reports");
packageRouter = require("./routes/packages");
userRouter = require("./routes/users");


// app.use("/message", msgRouter);
// app.use("/chat", chatRouter);
app.use("/admin", adminRouter);
app.use("/article", articleRouter);
app.use("/interest", interestRouter);
app.use("/report", reportRouter);
app.use("/package", packageRouter);
app.use("/user", userRouter);


app.get("/", (req, res) => {
    res.send("Hello Dev")
})
// section for middlewares
// auth.js

app.listen(3000, () => {
    console.log("connected!");
});