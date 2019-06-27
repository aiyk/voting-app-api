const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const LgaControl = require('../controllers/LgaControl');

router.post('/api/lga/create', passport.authenticate('jwt', {session: false}), LgaControl.create);
router.post('/api/lga/update', passport.authenticate('jwt', {session: false}), LgaControl.update);
router.get('/api/lga/retrieve', LgaControl.retrieve);
router.delete('/api/lga/delete', passport.authenticate('jwt', {session: false}), LgaControl.delete);

module.exports = router;