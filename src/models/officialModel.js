const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officialSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    othernames: String,
    email: {type: String, required: true},
    phone: {type: String, required: true},
    poolingUnit_id: {type: Schema.Types.ObjectId, required: true}
});

module.exports = Official = mongoose.model('officials', officialSchema);