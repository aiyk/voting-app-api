const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const OfficialModel = require('../models/officialModel');

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
        let password =  'password';

        UserModel.findOne({username: username})
            .then(user => { 
                while(user){
                    username =  generateString(5);
                }
                
                const newUser = new UserModel({
                    username: username,
                    password: password,
                    email: req.body.email,
                    access: 'official', // [admin, official, voter]
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                // persist official
                                const newOfficial = new OfficialModel({
                                    user_id: user._id,
                                    firstname: req.body.firstname,
                                    lastname: req.body.lastname,
                                    othernames: req.body.othernames,
                                    email: req.body.email,
                                    phone: req.body.phone,
                                    poolingUnit_id: req.body.poolingUnit_id
                                });
                        
                                newOfficial.save()
                                    .then( result => {
                                        res.json({ newUser});
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
        const id = req.params.id; 
        OfficialModel.updateOne({_id: id}, req.body)
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
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            OfficialModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'party does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    delete: (req, res) => {
        const id = req.params.id; 
        OfficialModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'official does not exist'});
                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    }
}