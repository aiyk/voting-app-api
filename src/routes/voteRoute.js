const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const VoteControl = require('../controllers/VoteControl');

router.post('/api/vote/update', passport.authenticate('jwt', {session: false}), VoteControl.update);
router.get('/api/vote/retrieve', VoteControl.retrieve);

module.exports = router;