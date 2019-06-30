const PartyModel = require('../models/partyModel');

module.exports = {
    create: (req, res) => {
        PartyModel.findOne({partyname: req.body.partyname})
            .then(party => { 
                if(party){
                    return res.json({ success: false, result: `${req.body.partyname} already exists`});
                }

                const newParty = new PartyModel({
                    partyname: req.body.partyname,
                    candidates: req.body.candidates
                });

                newParty.save()
                    .then( result => {
                        res.json({ success: true, result: result});
                    })
                    .catch(err => {
                        res.json({success: false, result: err});
                    })
            })
    },
    update: (req, res) => {
        PartyModel.update({_id: req.body._id}, req.body)
            .then(party => {
                if(!party) res.json({success: false, result: 'party does not exist'});

                res.json(party);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        PartyModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        PartyModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'party does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}