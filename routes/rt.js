const express = require('express');
const router = express.Router();

router.get('/rt');
router.get('/rt/:id');
router.post('/rt');
router.put('/rt/:id');
router.delete('/rt/:id');

module.exports = router;
