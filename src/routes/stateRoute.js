const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const StateControl = require('../controllers/StateControl');

router.post('/api/state/create', passport.authenticate('jwt', {session: false}), StateControl.create);
router.put('/api/state/update/:id', passport.authenticate('jwt', {session: false}), StateControl.update);
router.get('/api/state/retrieve', passport.authenticate('jwt', {session: false}), StateControl.retrieve);
router.get('/api/state/retrieve/:id', passport.authenticate('jwt', {session: false}), StateControl.retrieveOne);
router.delete('/api/state/delete/:id', passport.authenticate('jwt', {session: false}), StateControl.delete);

module.exports = router;