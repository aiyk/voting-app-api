const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const ElectionControl = require('../controllers/ElectionControl');

router.post('/api/election/create', passport.authenticate('jwt', {session: false}), ElectionControl.create);
router.post('/api/election/update', passport.authenticate('jwt', {session: false}), ElectionControl.update);
router.get('/api/election/retrieve', ElectionControl.retrieve);
router.delete('/api/election/delete', passport.authenticate('jwt', {session: false}), ElectionControl.delete);

module.exports = router;