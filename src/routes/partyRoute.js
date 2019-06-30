const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const PartyControl = require('../controllers/PartyControl');

router.post('/api/party/create', passport.authenticate('jwt', {session: false}), PartyControl.create);
router.post('/api/party/update', passport.authenticate('jwt', {session: false}), PartyControl.update);
router.get('/api/party/retrieve', PartyControl.retrieve);
router.delete('/api/party/delete', passport.authenticate('jwt', {session: false}), PartyControl.delete);

module.exports = router;