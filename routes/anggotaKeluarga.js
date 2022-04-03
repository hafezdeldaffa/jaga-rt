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

// router.get('/anggotaKeluarga', getAnggotaKeluarga);
// router.get('/anggotaKeluarga/:id', getAnggotaKeluargaById);
router.post('/tambahAnggotaKeluarga', addAnggotaKeluarga);
router.post('/editAnggotaKeluarga/:id', editAnggotaKeluarga);
router.get('/deleteAnggotaKeluarga/:id', deleteAnggotaKeluarga);

module.exports = router;
