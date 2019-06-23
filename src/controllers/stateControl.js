const StateModel = require('../models/stateModel');

module.exports = {
    create: (req, res) => {
        let state = new StateModel({
            statename: req.body.statename,
            country_id: req.body.country_id
        });

        state.save()
            .then( result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            })
    },
    update: (req, res) => {
        StateModel.update({_id: req.body._id}, req.body)
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
    delete: (req, res) => {
        StateModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'state does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}