const express = require('express');
const {
  addAnggotaKeluarga,
  getAnggotaKeluarga,
  getAnggotaKeluargaById,
  editAnggotaKeluarga,
  deleteAnggotaKeluarga,
} = require('../controllers/anggotaKeluarga');
const { authenticateJWT } = require('../controllers/auth');
const router = express.Router();

router.get('/anggotaKeluarga', authenticateJWT, getAnggotaKeluarga);
router.get('/anggotaKeluarga/:id', authenticateJWT, getAnggotaKeluargaById);
router.post('/anggotaKeluarga', authenticateJWT, addAnggotaKeluarga);
router.put('/anggotaKeluarga/:id', authenticateJWT, editAnggotaKeluarga);
router.delete('/anggotaKeluarga/:id', authenticateJWT, deleteAnggotaKeluarga);

module.exports = router;
