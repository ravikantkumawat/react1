const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', "user", "partner"],
        require: true,
        default: "user",
    }
});

module.exports = mongoose.model("users", userSchema);
