const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    statename: {type: String, required: true},
    country_id: {type: Schema.Types.ObjectId, required: true}
});

module.exports = State = mongoose.model('states', stateSchema);