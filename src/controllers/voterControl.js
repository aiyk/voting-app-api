const VoterModel = require('../models/voterModel');

module.exports = {
    create: (req, res) => {
        let voter = new VoterModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            othernames: req.body.othernames,
            email: req.body.email,
            state: req.body.state,
            lga: req.body.lga,
            gender: req.body.gender,
            occupation: req.body.occupation,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth
        });

        voter.save()
            .then( result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            })
    },
    update: (req, res) => {
        VoterModel.update({_id: req.body._id}, req.body)
            .then(voter => {
                if(!voter) res.json({success: false, result: 'voter does not exist'});

                res.jason(voter);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        VoterModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        VoterModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'voter does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}