const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electionSchema = new Schema({
    electionname: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    country_id: {type: Schema.Types.ObjectId, required: true},

    // to vote, supply the voter id, the party id he's voted for and the other required data set
    // no need for the candidate, just the party and election does the majic
    votes: [
        {
            voter: {type: Schema.Types.ObjectId}, // user id (string)
            party: {type: Schema.Types.ObjectId}, // party id voted for
            partyname: {type: String}, // party id voted for
            state: {type: Schema.Types.ObjectId}, // voters state(string)
            lga: {type: Schema.Types.ObjectId}, // voters lga (string)
            poolingUnnit: {type: Schema.Types.ObjectId}, // voters pooling unit (string)
        }
    ],
    created: { type: Date, default: Date.now}
});

module.exports = Election = mongoose.model('elections', electionSchema);