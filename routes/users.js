const express = require('express');
const router = express.Router();

router.get('/login');
router.get('/signup')

router.post('/login');
router.post('/signup');

module.exports = router;