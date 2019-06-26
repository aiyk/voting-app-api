const express = require('express');
const router = express.Router();
const passport = require('passport');

//Controllers
const UserControl = require('../controllers/UserControl');

router.post('/api/user/create', passport.authenticate('jwt', {session: false}), UserControl.create);
router.post('/api/user/update', UserControl.update);
router.get('/api/user/retrieve', UserControl.retrieve);
router.delete('/api/user/delete', UserControl.delete);
router.post('/api/user/login', UserControl.login);

module.exports = router;