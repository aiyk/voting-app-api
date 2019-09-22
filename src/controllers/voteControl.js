const UserModel = require('../models/userModel');
const ElectionModel = require('../models/electionModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// add finger ptint scans to voterSchema on voter registeration
// when voting, find voter's print or user id in voterModel, if not found, voter not registered, else
// grab election by id and check if user data already exist in electionModel, if true, user has already voted else update votes[] in electionModel with user data
// alternatively, supply user credentioals to vote

module.exports = {
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
                                   if(election){ console.log('req body', req.body);
       
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