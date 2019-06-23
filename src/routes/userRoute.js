const express = require('express');
const router = express.Router();

//Controllers
const UserControl = require('../controllers/UserControl');

router.post('/api/user/create', UserControl.create);
router.post('/api/user/update', UserControl.update);
router.post('/api/user/update', UserControl.update);
router.get('/api/user/retrieve', UserControl.retrieve);
router.delete('/api/user/delete', UserControl.delete);

module.exports = router;