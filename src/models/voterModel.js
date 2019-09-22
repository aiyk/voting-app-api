const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    othernames: String,
    email: {type: String, required: true},
    country_id: {type: Schema.Types.ObjectId, ref: 'countries', required: true},
    state_id: {type: Schema.Types.ObjectId, ref: 'states', required: true},
    lga_id: {type: Schema.Types.ObjectId, ref: 'lgas', required: true},
    poolingUnit_id: {type: Schema.Types.ObjectId, ref: 'poolingUnits', required: true},
    address: {type: String, required: true},
    gender: {type: String, required: true},
    fingerprint: {type: String},
    occupation: String,
    dateOfBirth: {type: String, required: true},
    created: { type: Date, default: Date.now}
});

module.exports = Voter = mongoose.model('voters', voterSchema);