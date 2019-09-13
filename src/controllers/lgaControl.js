const LgaModel = require('../models/lgaModel');

module.exports = {
    create: (req, res) => {
        LgaModel.findOne({lganame: req.body.lganame})
            .then(lga => { 
                if(lga){
                    return res.json({ success: false, result: `${req.body.lganame} already exists`});
                }
                        
                let newLga = new LgaModel({
                    lganame: req.body.lganame,
                    state_id: req.body.state_id,
                    country_id: req.body.country_id
                });

                newLga.save()
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
        LgaModel.updateOne({_id: id}, req.body)
            .then(lga => {
                if(!lga) res.json({success: false, result: 'lga does not exist'});

                res.jason(lga);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            LgaModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'lga does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    retrieve: (req, res) => { 
        LgaModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        const id = req.params.id; 
        LgaModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'lga does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}