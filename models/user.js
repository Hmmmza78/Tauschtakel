const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  interests: {
    type: Array,
    required: true
  },
  blocked: {
    type: Boolean,
    required: true,
    default: false
  },
  notification: {
    type: Boolean,
    required: true,
    default: false
  },
  packages: {
    type: Array,
    required: true,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
  // image: {
  //   type: String,
  //   default: "",
  //   required: false
  // },
}, {
  collection: "users",
});

const model = mongoose.model("userSchema", userSchema);

module.exports = model;