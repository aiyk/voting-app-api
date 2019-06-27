const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const CountryControl = require('../controllers/CountryControl');

router.post('/api/country/create', passport.authenticate('jwt', {session: false}), CountryControl.create);
router.post('/api/country/update', passport.authenticate('jwt', {session: false}), CountryControl.update);
router.get('/api/country/retrieve', CountryControl.retrieve);
router.delete('/api/country/delete', passport.authenticate('jwt', {session: false}), CountryControl.delete);

module.exports = router;