const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const VoterModel = require('../models/voterModel');

const generateString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = {
    create: (req, res) => { 

        // create user
        let username =  generateString(5);
        let password =  generateString(5);

        UserModel.findOne({username: username})
            .then(user => { 
                while(user){
                    username =  generateString(5);
                }
                
                const newUser = new UserModel({
                    username: username,
                    password: password,
                    email: req.body.email,
                    access: 'voter', // [admin, voter, voter]
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                // persist voter
                                const newVoter = new VoterModel({
                                    user_id: user._id,
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
                        
                                newVoter.save()
                                    .then( result => {
                                        res.json({ result});
                                    })
                                    .catch(err => {
                                        res.json({success: false, result: err});
                                    })
                            })
                            // .then(user => res.json({
                            //     _id: user._id,
                            //     username: user.username,
                            //     email: user.email,
                            //     access: user.access,
                            //     date: user.date
                            // }))
                            .catch(err => console.log(err));
                    });
                })
            }); 
    },
    update: (req, res) => {
        VoterModel.update({_id: req.body._id}, req.body)
            .then(voter => {
                if(!voter) res.json({success: false, result: 'voter does not exist'});

                res.jason(voter);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        VoterModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    delete: (req, res) => {
        VoterModel.remove({_id: req.body._id})
            .then( result => {
                if(!result) res.json({success: false, result: 'voter does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}