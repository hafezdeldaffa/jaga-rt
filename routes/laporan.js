const express = require('express');
const { authenticateJWT } = require('../controllers/auth');
const {
  getDataPositif,
  addLaporan,
  getLaporan,
} = require('../controllers/laporan');
const router = express.Router();

router.get('/data-positif', authenticateJWT, getDataPositif);
router.get('/laporan', authenticateJWT, getLaporan);
router.get('/laporan/:id');
router.post('/laporan/:id', authenticateJWT, addLaporan);
router.put('/laporan/:id');
router.delete('/laporan/:id');

module.exports = router;
