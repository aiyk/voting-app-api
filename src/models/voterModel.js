const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    othernames: String,
    email: {type: String, required: true},
    state: {type: String, required: true},
    lga: {type: String, required: true},
    gender: {type: String, required: true},
    occupation: String,
    address: {type: String, required: true},
    dateOfBirth: {type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);