const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const VoteControl = require('../controllers/VoteControl');

router.post('/api/vote/voteWithId', passport.authenticate('jwt', {session: false}), VoteControl.voteWithId);
router.get('/api/vote/getResults', passport.authenticate('jwt', {session: false}), VoteControl.getResults);
router.get('/api/vote/getResult/:id', passport.authenticate('jwt', {session: false}), VoteControl.getResult);

module.exports = router;