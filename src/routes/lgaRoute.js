const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const LgaControl = require('../controllers/LgaControl');

router.post('/api/lga/create', passport.authenticate('jwt', {session: false}), LgaControl.create);
router.put('/api/lga/update/:id', passport.authenticate('jwt', {session: false}), LgaControl.update);
router.get('/api/lga/retrieve', passport.authenticate('jwt', {session: false}), LgaControl.retrieve);
router.get('/api/lga/retrieve/:id', passport.authenticate('jwt', {session: false}), LgaControl.retrieveOne);
router.delete('/api/lga/delete/:id', passport.authenticate('jwt', {session: false}), LgaControl.delete);

module.exports = router; 