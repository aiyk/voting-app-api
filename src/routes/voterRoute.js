const express = require('express');
const router = express.Router();

//Controllers
const VoterControl = require('../controllers/VoterControl');

router.post('/api/voter/create', VoterControl.create);
router.post('/api/voter/update', VoterControl.update);
router.get('/api/voter/retrieve', VoterControl.retrieve);
router.delete('/api/voter/delete', VoterControl.delete);

module.exports = router;