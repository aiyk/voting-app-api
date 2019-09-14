const PoolingUnitModel = require('../models/poolingUnitModel');

module.exports = {
    create: (req, res) => {
        PoolingUnitModel.findOne({unitname: req.body.unitname})
            .then(country => { 
                if(country){
                    return res.json({ success: false, result: `${req.body.unitname} already exists`});
                }
                let poolingUnit = new PoolingUnitModel({
                    unitname: req.body.unitname,
                    lga_id: req.body.lga_id,
                    state_id: req.body.state_id,
                    country_id: req.body.country_id
                });

                poolingUnit.save()
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
        PoolingUnitModel.updateOne({_id: id}, req.body)
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
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            PoolingUnitModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'pooling unit does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    delete: (req, res) => {
        const id = req.params.id; 
        PoolingUnitModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'pooling unit does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}