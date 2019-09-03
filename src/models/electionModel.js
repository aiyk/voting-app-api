const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electionSchema = new Schema({
    electionName: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    country: {type: Schema.Types.ObjectId, required: true},
    votes: [
        {
            voter: {type: Schema.Types.ObjectId}, // user id (string)
            party: {type: Schema.Types.ObjectId}, // party id voted for
            state: {type: Array, required: true}, // voters state(string)
            lga: {type: Array, required: true}, // voters lga (string)
            poolingUnnit: {type: Array, required: true}, // voters pooling unit (string)
        }
    ],
    created: { type: Date, default: Date.now}
});

module.exports = Election = mongoose.model('elections', electionSchema);