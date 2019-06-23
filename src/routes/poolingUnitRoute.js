const express = require('express');
const router = express.Router();

//Controllers
const PoolingUnitControl = require('../controllers/PoolingUnitControl');

router.post('/api/poolingUnit/create', PoolingUnitControl.create);
router.post('/api/poolingUnit/update', PoolingUnitControl.update);
router.post('/api/poolingUnit/update', PoolingUnitControl.update);
router.get('/api/poolingUnit/retrieve', PoolingUnitControl.retrieve);
router.delete('/api/poolingUnit/delete', PoolingUnitControl.delete);

module.exports = router;