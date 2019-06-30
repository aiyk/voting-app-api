const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    countryname: {type: String, required: true},
    created: { type: Date, default: Date.now}
});

module.exports = Country = mongoose.model('countries', countrySchema);