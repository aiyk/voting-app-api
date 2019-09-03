const ElectionModel = require('../models/ElectionModel');

module.exports = {
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
    }
}