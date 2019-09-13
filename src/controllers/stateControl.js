const StateModel = require('../models/stateModel');

module.exports = {
    create: (req, res) => {
        StateModel.findOne({statename: req.body.statename})
            .then(state => { 
                if(state){
                    return res.json({ success: false, result: `${req.body.statename} already exists`});
                }

                const newState = new StateModel({
                    statename: req.body.statename,
                    country_id: req.body.country_id
                });

                newState.save()
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
        StateModel.updateOne({_id: id}, req.body)
            .then(state => {
                if(!state) res.json({success: false, result: 'state does not exist'});

                res.jason(state);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => { 
        StateModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            StateModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'state does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    delete: (req, res) => {
        const id = req.params.id; 
        StateModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'state does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}