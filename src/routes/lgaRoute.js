const express = require('express');
const router = express.Router();

//Controllers
const LgaControl = require('../controllers/LgaControl');

router.post('/api/lga/create', LgaControl.create);
router.post('/api/lga/update', LgaControl.update);
router.post('/api/lga/update', LgaControl.update);
router.get('/api/lga/retrieve', LgaControl.retrieve);
router.delete('/api/lga/delete', LgaControl.delete);

module.exports = router;