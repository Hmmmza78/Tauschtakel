require("dotenv").config();
require("./functions/dbConnect")();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// db connection
const User = require("./models/user");
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

// importing messages+chat router
// msgRouter = require("./routes/messages");
// chatRouter = require("./routes/chats");
articleRouter = require("./routes/articles");
interestRouter = require("./routes/interests");
userRouter = require("./routes/users");
// app.use("/message", msgRouter);
// app.use("/chat", chatRouter);
app.use("/article", articleRouter);
app.use("/interest", interestRouter);
app.use("/user", userRouter);


// section for middlewares
// auth.js

app.listen(3000, () => {
    console.log("connected!");
});