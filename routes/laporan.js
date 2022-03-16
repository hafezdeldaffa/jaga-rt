const express = require('express');
const { authenticateJWT } = require('../controllers/auth');
const {
  getDataPositif,
  addLaporan,
  getLaporan,
  getLaporanById,
  editLaporan,
} = require('../controllers/laporan');
const router = express.Router();

router.get('/data-positif', authenticateJWT, getDataPositif);
router.get('/laporan', authenticateJWT, getLaporan);
router.get('/laporan/:id', authenticateJWT, getLaporanById);
router.post('/laporan/:id', authenticateJWT, addLaporan);
router.put('/laporan/:id', authenticateJWT, editLaporan);
router.delete('/laporan/:id');

module.exports = router;
