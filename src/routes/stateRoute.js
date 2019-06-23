const express = require('express');
const router = express.Router();

//Controllers
const StateControl = require('../controllers/StateControl');

router.post('/api/state/create', StateControl.create);
router.post('/api/state/update', StateControl.update);
router.post('/api/state/update', StateControl.update);
router.get('/api/state/retrieve', StateControl.retrieve);
router.delete('/api/state/delete', StateControl.delete);

module.exports = router;