const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const OfficialControl = require('../controllers/OfficialControl');

router.post('/api/official/create', passport.authenticate('jwt', {session: false}), OfficialControl.create);
router.put('/api/official/update/:id', passport.authenticate('jwt', {session: false}), OfficialControl.update);
router.get('/api/official/retrieve', passport.authenticate('jwt', {session: false}), OfficialControl.retrieve);
router.get('/api/official/retrieve/:id', passport.authenticate('jwt', {session: false}), OfficialControl.retrieveOne);
router.delete('/api/official/delete/:id', passport.authenticate('jwt', {session: false}), OfficialControl.delete);

module.exports = router;