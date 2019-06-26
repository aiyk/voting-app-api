const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

module.exports = {
    create: (req, res) => {

        UserModel.findOne({username: req.body.username})
            .then(user => {
                if(user) {
                    return res.status(400).json({username: 'Username already exists'});
                } else {
                    const newUser = new UserModel({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        access: req.body.access, // [admin, official, voter]
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json({
                                    _id: user._id,
                                    username: user.username,
                                    email: user.email,
                                    access: user.access,
                                    date: user.date
                                }))
                                .catch(err => console.log(err));
                        });
                    })
                }
            });
    },
    login: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        //find user by username
        UserModel.findOne({username})
            .then(user => {
                //check for user
                if(!user){
                    return res.status(404).json({user: 'user not found'});
                }

                //check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            //user matched, create jwt payload
                            const payload = {
                                id: user.id,
                                username: user.username,
                                access: user.access,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                othernames: user.othernames
                            }

                            //sign the token
                            //3600 = 1hr
                            jwt.sign(payload, keys.secreteOrKey, {expiresIn: 3600}, (err, token) => {
                                res.json({
                                    success: true,
                                    tokem: 'Bearer ' + token
                                })
                            }); 
                        } else {
                            return res.status(400).json({password: 'password incorrect'});
                        }
                    })
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