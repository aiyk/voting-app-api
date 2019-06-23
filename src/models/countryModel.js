const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    countryname: {type: String, required: true}
});

module.exports = Country = mongoose.model('countries', countrySchema);