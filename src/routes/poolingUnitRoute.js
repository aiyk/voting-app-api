const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const PoolingUnitControl = require('../controllers/PoolingUnitControl');

router.post('/api/poolingUnit/create', passport.authenticate('jwt', {session: false}), PoolingUnitControl.create);
router.post('/api/poolingUnit/update', passport.authenticate('jwt', {session: false}), PoolingUnitControl.update);
router.get('/api/poolingUnit/retrieve', PoolingUnitControl.retrieve);
router.delete('/api/poolingUnit/delete', passport.authenticate('jwt', {session: false}), PoolingUnitControl.delete);

module.exports = router;