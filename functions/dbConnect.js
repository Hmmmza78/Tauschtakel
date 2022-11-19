const mongoose = require("mongoose");

function connect() {
    mongoose.connect(process.env.MONGODB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }, () => {
        console.log("db connected");
    });
}
module.exports=connect;