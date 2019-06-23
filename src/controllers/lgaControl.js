const LgaModel = require('../models/lgaModel');

module.exports = {
    create: (req, res) => {
        let lga = new LgaModel({
            lganame: req.body.lganame,
            state_id: req.body.state_id,
            country_id: req.body.country_id
        });

        lga.save()
            .then( result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            })
    },
    update: (req, res) => {
        LgaModel.update({_id: req.body._id}, req.body)
            .then(lga => {
                if(!lga) res.json({success: false, result: 'lga does not exist'});

                res.jason(lga);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
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
        LgaModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'lga does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}