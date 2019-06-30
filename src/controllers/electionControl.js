const ElectionModel = require('../models/ElectionModel');

module.exports = {
    create: (req, res) => {
        ElectionModel.findOne({electionname: req.body.electionname})
            .then(election => { 
                if(election){
                    return res.json({ success: false, result: `${req.body.electionname} already exists`});
                }

                const newElection = new ElectionModel({
                    electionname: req.body.electionname,
                    country: req.body.country,
                    state: req.body.state,
                    lga: req.body.lga,
                    poolingUnnit: req.body.poolingUnnit,
                });

                newElection.save()
                    .then( result => {
                        res.json({ success: true, result: result});
                    })
                    .catch(err => {
                        res.json({success: false, result: err});
                    })
            })
    },
    update: (req, res) => {
        ElectionModel.update({_id: req.body._id}, req.body)
            .then(election => {
                if(!election) res.json({success: false, result: 'election does not exist'});

                res.json(election);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        ElectionModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        ElectionModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'election does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}