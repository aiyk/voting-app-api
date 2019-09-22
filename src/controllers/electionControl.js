const ElectionModel = require('../models/ElectionModel');
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports = {
    create: (req, res) => { console.log('in here', req.body);
        ElectionModel.findOne({electionname: req.body.electionname})
            .then(election => { 
                if(election){
                    return res.json({ success: false, result: `${req.body.electionname} already exists`});
                }

                const newElection = new ElectionModel({
                    electionname: req.body.electionname,
                    country_id: req.body.country_id,
                    votes: [],
                });

                newElection.save()
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
        ElectionModel.updateOne({_id: id}, req.body)
            .then(election => {
                if(!election) res.json({success: false, result: 'election does not exist'});

                res.json(election);
            })
            .catch(err => {
                res.json({success: false, result: err})
            })
    },
    retrieve: (req, res) => {
        ElectionModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    retrieveOne: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            ElectionModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'election does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    },
    delete: (req, res) => {
        const id = req.params.id; 
        ElectionModel.deleteOne({_id: id})
            .then( result => {
                if(!result) res.json({success: false, result: 'election does not exist'});
                res.json({success: true, result: result});
            }) 
            .catch(err => res.json({success: false, result: err}));
    },

    // VOTING CONTROLLERS
    voteWithId: (req, res) => { 
        const election_id = req.body.election_id; 
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
                           const voter_id = user._id; // the user id to uniquely identify who voted

                           ElectionModel.findOne({_id: election_id})
                               .then(election => { 
                                   if(election){ 
       
                                    userVote = req.body.vote;
                                    userVote.voter = voter_id;
                                    election.votes.push(userVote);
                                    
                                    ElectionModel.updateOne({_id: election_id}, election)
                                        .then(election => {
                                            if(!election) res.json({success: false, result: 'election does not exist'});
                    
                                            res.jason(election);
                                        })
                                        .catch(err => {
                                            res.json({success: false, result: err})
                                        })
                                   }
                               });
                        } else {
                            return res.status(400).json({password: 'password incorrect'});
                        }
                    })
            }); 
    },
    getResults: (req, res) => {
        ElectionModel.find()
            .then(result => {
                if(!result) res.json({success: false, result: 'no results found'});

                res.json({success: true, result: result});
            })
            .catch(err => res.json({success: false, result: err}));
    },
    getResult: (req, res) => {
        if(req.params.id){
            const id = req.params.id; 
            ElectionModel.findOne({_id: id})
                .then(result => {
                    if(!result) res.json({success: false, result: 'election does not exist'});
    
                    res.json({success: true, result: result});
                })
                .catch(err => res.json({success: false, result: err}));
        }
    }
}