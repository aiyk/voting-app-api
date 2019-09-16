const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySchema = new Schema({
    partyname: {type: String, required: true},
    candidates: [
        {
            election_id: {type: Schema.Types.ObjectId},
            candidatename: {type: String, required: true},
            electionname: {type: String, required: true}
        }
    ],
    created: { type: Date, default: Date.now}
});

module.exports = Party = mongoose.model('parties', partySchema);