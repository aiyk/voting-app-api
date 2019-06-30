const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officialSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    othernames: String,
    email: {type: String, required: true},
    phone: {type: String, required: true},
    poolingUnit_id: {type: Schema.Types.ObjectId, ref: 'poolingUnits', required: true},
    created: { type: Date, default: Date.now}
});

module.exports = Official = mongoose.model('officials', officialSchema);