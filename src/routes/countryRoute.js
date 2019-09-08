const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const CountryControl = require('../controllers/CountryControl');

router.post('/api/country/create', passport.authenticate('jwt', {session: false}), CountryControl.create);
router.put('/api/country/update/:id', passport.authenticate('jwt', {session: false}), CountryControl.update);
router.get('/api/country/retrieve', passport.authenticate('jwt', {session: false}), CountryControl.retrieve);
router.get('/api/country/retrieve/:id', passport.authenticate('jwt', {session: false}), CountryControl.retrieveOne);
router.delete('/api/country/delete/:id', passport.authenticate('jwt', {session: false}), CountryControl.delete);

module.exports = router;