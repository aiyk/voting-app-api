const CountryModel = require('../models/countryModel');

module.exports = {
    create: (req, res) => { 
        CountryModel.findOne({countryname: req.body.countryname})
            .then(country => { 
                if(country){
                    return res.json({ success: false, result: `${req.body.countryname} already exists`});
                }

                const newCountry = new CountryModel({
                    countryname: req.body.countryname
                });

                newCountry.save()
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
        CountryModel.updateOne({_id: id}, req.body)
            .then(country => { 
                if(!country) res.json({success: false, result: 'country does not exist'});

                res.json(country);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            CountryModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'country does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    retrieve: (req, res) => {
        CountryModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => { 
        const id = req.params.id; 
        CountryModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'country does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}