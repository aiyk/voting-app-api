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
    state: {type: Array, required: true}, // array os state ids (string)
    lga: {type: Array, required: true}, // array os lga ids (string)
    poolingUnnit: {type: Array, required: true}, // array os lga ids (string)
    votes: [
        {
            voter: {type: Schema.Types.ObjectId}, // array of user ids (string)
            vote: {type: Schema.Types.ObjectId} // party id
        }
    ],
    created: { type: Date, default: Date.now}
});

module.exports = Election = mongoose.model('elections', electionSchema);