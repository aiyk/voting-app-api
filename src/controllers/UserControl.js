const UserModel = require('../models/userModel');

module.exports = {
    create: (req, res) => {
        let user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

        user.save()
            .then( result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            })
    },
    update: (req, res) => {
        UserModel.update({_id: req.body._id}, req.body)
            .then(user => {
                if(!user) res.json({success: false, result: 'user does not exist'});

                res.jason(user);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        UserModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        UserModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'user does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}