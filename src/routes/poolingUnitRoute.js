const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const PoolingUnitControl = require('../controllers/PoolingUnitControl');

router.post('/api/poolingUnit/create', passport.authenticate('jwt', {session: false}), PoolingUnitControl.create);
router.put('/api/poolingUnit/update/:id', passport.authenticate('jwt', {session: false}), PoolingUnitControl.update);
router.get('/api/poolingUnit/retrieve', passport.authenticate('jwt', {session: false}), PoolingUnitControl.retrieve);
router.get('/api/poolingUnit/retrieve/:id', passport.authenticate('jwt', {session: false}), PoolingUnitControl.retrieveOne);
router.delete('/api/poolingUnit/delete/:id', passport.authenticate('jwt', {session: false}), PoolingUnitControl.delete);

module.exports = router;