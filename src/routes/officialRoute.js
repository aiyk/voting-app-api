const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const OfficialControl = require('../controllers/OfficialControl');

router.post('/api/official/create', passport.authenticate('jwt', {session: false}), OfficialControl.create);
router.post('/api/official/update', OfficialControl.update);
router.get('/api/official/retrieve', OfficialControl.retrieve);
router.delete('/api/official/delete', OfficialControl.delete);

module.exports = router;