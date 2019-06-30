const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lgaSchema = new Schema({
    lganame: {type: String, required: true},
    state_id: {type: Schema.Types.ObjectId, required: true},
    country_id: {type: Schema.Types.ObjectId, required: true},
    created: { type: Date, default: Date.now}
});

module.exports = Lga = mongoose.model('lgas', lgaSchema);