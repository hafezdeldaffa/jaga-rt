const express = require('express');
const { authenticateJWT } = require('../controllers/auth');
const { getDataPositif, addLaporan } = require('../controllers/laporan');
const router = express.Router();

router.get('/laporan', authenticateJWT, getDataPositif);
router.get('/laporan/:id');
router.post('/laporan/:id', authenticateJWT, addLaporan);
router.put('/laporan/:id');
router.delete('/laporan/:id');

module.exports = router;
