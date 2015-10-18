var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username: {type: String,unique: true},
    password: String,
    following: Array
});

module.exports = mongoose.model("User", userSchema);