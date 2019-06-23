const PoolingUnitModel = require('../models/poolingUnitModel');

module.exports = {
    create: (req, res) => {
        let poolingUnit = new PoolingUnitModel({
            unitname: req.body.unitname,
            votes: req.body.votes,
            lga_id: req.body.lga_id,
            state_id: req.body.state_id,
            country_id: req.body.country_id,
            official_id: req.body.official_id
        });

        poolingUnit.save()
            .then( result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            })
    },
    update: (req, res) => {
        PoolingUnitModel.update({_id: req.body._id}, req.body)
            .then(poolingUnit => {
                if(!poolingUnit) res.json({success: false, result: 'poolingUnit does not exist'});

                res.jason(poolingUnit);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        PoolingUnitModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        PoolingUnitModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'poolingUnit does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}