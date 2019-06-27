const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const StateControl = require('../controllers/StateControl');

router.post('/api/state/create', passport.authenticate('jwt', {session: false}), StateControl.create);
router.post('/api/state/update', passport.authenticate('jwt', {session: false}), StateControl.update);
router.get('/api/state/retrieve', StateControl.retrieve);
router.delete('/api/state/delete', passport.authenticate('jwt', {session: false}), StateControl.delete);

module.exports = router;