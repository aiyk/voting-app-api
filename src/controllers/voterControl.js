const OfficialModel = require('../models/officialModel');

module.exports = {
    create: (req, res) => {
        let official = new OfficialModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            othernames: req.body.othernames,
            email: req.body.email,
            country_id: req.body.country_id,
            state_id: req.body.state_id,
            lga_id: req.body.lga_id,
            poolingUnit_id: req.body.poolingUnit_id,
            address: req.body.address,
            gender: req.body.gender,
            occupation: req.body.occupation,
            dateOfBirth: req.body.dateOfBirth
        });

        official.save()
            .then( result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            })
    },
    update: (req, res) => {
        OfficialModel.update({_id: req.body._id}, req.body)
            .then(official => {
                if(!official) res.json({success: false, result: 'official does not exist'});

                res.jason(official);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        OfficialModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        OfficialModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'official does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}