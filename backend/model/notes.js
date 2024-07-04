const mongoose = require("mongoose");



const notesShema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require:true
    },
    title: {
        type: String,
        require: true,
    },
    notes: {
        type: String,
        require: true,
    },
    pin: {
        type: Boolean,
        require: true,
        default: false
    },
    higlight: {
        type: Boolean,
        require: true,
        default: false
    },
    archive: {
        type: Boolean,
        require: true,
        default: false
    },
    trash: {
        type: Boolean,
        require: true,
        default: false
    },
    time: {
        type: String,
        require: true,
        default: new Date().toLocaleTimeString()
    },
    date: {
        type: String,
        require: true,
        default: new Date().toLocaleDateString()
    },
    lastModify:{
        type: String,
        require: true,
        default: "no"
    }
});
const notes = mongoose.model('userNote', notesShema);
module.exports = notes;