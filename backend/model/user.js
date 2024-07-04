const mongoose = require("mongoose");

const mongooseShema = mongoose.Schema({
    name: {
        require: true,
        type: String,
    },
    email: {
        require: true,
        type: String,
    },
    mobile: {
        require: true,
        type: Number,
    },
    password: {
        require: true,
        type: String,
    },
    token: {
        require: true,
        type: String,
    },
    profile: {
        require: true,
        type: String,
        default:"default.jpg"
    },
    otp: {
        require: true,
        type: Number,
    },
    active: {
        require: true,
        type: String,
        default: "deactive"
    },
    accountOpenDate: {
        require: true,
        type: String,
        default: new Date().toLocaleDateString()
    },
    accountOpenTime: {
        require: true,
        type: String,
        default: new Date().toLocaleTimeString()
    },
    lastModify: {
        require: true,
        type: String,
        default: "No"
    }
});
const user = mongoose.model('userInfo', mongooseShema);

module.exports = user;