const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String },
    gender: { type: String },
    profilepic: { type: String, default: "https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-business-man-icon-png-image_4184077.jpg" },
    date: { type: Date, default: Date.now }
});

module.exports = Person = mongoose.model('Person', PersonSchema);