const ElectionModel = require('../models/ElectionModel');

module.exports = {
    create: (req, res) => { console.log('in here', req.body);
        ElectionModel.findOne({electionname: req.body.electionname})
            .then(election => { 
                if(election){
                    return res.json({ success: false, result: `${req.body.electionname} already exists`});
                }

                const newElection = new ElectionModel({
                    electionname: req.body.electionname,
                    country_id: req.body.country_id,
                    votes: [],
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
        const id = req.params.id; 
        ElectionModel.updateOne({_id: id}, req.body)
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
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            ElectionModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'election does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    delete: (req, res) => {
        const id = req.params.id; 
        ElectionModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'election does not exist'});
                res.json({success: true, result: result});
            }) 
            .catch(err => res.json({success: false, result: err}));
    }
}