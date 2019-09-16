const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const ElectionControl = require('../controllers/ElectionControl');

router.post('/api/election/create', passport.authenticate('jwt', {session: false}), ElectionControl.create);
router.put('/api/election/update/:id', passport.authenticate('jwt', {session: false}), ElectionControl.update);
router.get('/api/election/retrieve', passport.authenticate('jwt', {session: false}), ElectionControl.retrieve);
router.get('/api/election/retrieve/:id', passport.authenticate('jwt', {session: false}), ElectionControl.retrieveOne);
router.delete('/api/election/delete/:id', passport.authenticate('jwt', {session: false}), ElectionControl.delete);

module.exports = router;