const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    othernames: String,
    email: {type: String, required: true},
    country_id: {type: Schema.Types.ObjectId, required: true},
    state_id: {type: Schema.Types.ObjectId, required: true},
    lga_id: {type: Schema.Types.ObjectId, required: true},
    poolingUnit_id: {type: Schema.Types.ObjectId, required: true},
    address: {type: String, required: true},
    gender: {type: String, required: true},
    occupation: String,
    dateOfBirth: {type: String, required: true},
    created: { type: Date, default: Date.now}
});

module.exports = Voter = mongoose.model('voters', voterSchema);