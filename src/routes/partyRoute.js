const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const PartyControl = require('../controllers/PartyControl');

router.post('/api/party/create', passport.authenticate('jwt', {session: false}), PartyControl.create);
router.put('/api/party/update/:id', passport.authenticate('jwt', {session: false}), PartyControl.update);
router.put('/api/party/update-candidate/:id', passport.authenticate('jwt', {session: false}), PartyControl.updateCandidate);
router.get('/api/party/retrieve', passport.authenticate('jwt', {session: false}), PartyControl.retrieve);
router.get('/api/party/retrieve/:id', passport.authenticate('jwt', {session: false}), PartyControl.retrieve);
router.delete('/api/party/delete/:id', passport.authenticate('jwt', {session: false}), PartyControl.delete);

module.exports = router;