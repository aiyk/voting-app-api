const express = require('express');
const router = express.Router();

//Controllers
const CountryControl = require('../controllers/CountryControl');

router.post('/api/country/create', CountryControl.create);
router.post('/api/country/update', CountryControl.update);
router.post('/api/country/update', CountryControl.update);
router.get('/api/country/retrieve', CountryControl.retrieve);
router.delete('/api/country/delete', CountryControl.delete);

module.exports = router;