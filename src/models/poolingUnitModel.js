const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poolingUnitSchema = new Schema({
    unitname: {type: String, required: true},
    // votes: Array, // array of voters id || an array of objects of voter and party
    lga_id: {type: Schema.Types.ObjectId, required: true},
    state_id: {type: Schema.Types.ObjectId, required: true},
    country_id: {type: Schema.Types.ObjectId, required: true},
    created: { type: Date, default: Date.now}
});

module.exports = PoolingUnit = mongoose.model('poolingUnits', poolingUnitSchema);