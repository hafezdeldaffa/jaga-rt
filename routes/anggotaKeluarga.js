const express = require('express');
const {
  addAnggotaKeluarga,
  editAnggotaKeluarga,
  deleteAnggotaKeluarga,
} = require('../controllers/anggotaKeluarga');
const router = express.Router();

router.post('/tambahAnggotaKeluarga', addAnggotaKeluarga);
router.post('/editAnggotaKeluarga/:id', editAnggotaKeluarga);
router.get('/deleteAnggotaKeluarga/:id', deleteAnggotaKeluarga);

module.exports = router;
