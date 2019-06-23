const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: {type: String, required: true},
    email: {type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);