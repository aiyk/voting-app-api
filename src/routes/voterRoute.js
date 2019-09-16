const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const VoterControl = require('../controllers/VoterControl');

router.post('/api/voter/create', passport.authenticate('jwt', {session: false}), VoterControl.create);
router.put('/api/voter/update/:id', passport.authenticate('jwt', {session: false}), VoterControl.update);
router.get('/api/voter/retrieve', passport.authenticate('jwt', {session: false}), VoterControl.retrieve);
router.get('/api/voter/retrieve/:id', passport.authenticate('jwt', {session: false}), VoterControl.retrieveOne);
router.delete('/api/voter/delete/:id', passport.authenticate('jwt', {session: false}), VoterControl.delete);

module.exports = router; 