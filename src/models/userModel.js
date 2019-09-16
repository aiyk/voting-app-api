const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    access: {type: String, required: true}, // admin, voter, official
    created: { type: Date, default: Date.now}
});

module.exports = User = mongoose.model('users', userSchema);