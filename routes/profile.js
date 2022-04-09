const express = require('express');
const { isAuth } = require('../controllers/auth');
const { editProfile } = require('../controllers/profile');
const router = express.Router();

router.post('/editProfile/:id', isAuth, editProfile);
router.post('/editPassword', isAuth);

module.exports = router;
