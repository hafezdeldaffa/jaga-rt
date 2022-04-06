const express = require('express');
const {
  addAnggotaKeluarga,
  editAnggotaKeluarga,
  deleteAnggotaKeluarga,
} = require('../controllers/anggotaKeluarga');
const { isAuth } = require('../controllers/auth');
const router = express.Router();

router.post('/tambahAnggotaKeluarga', isAuth, addAnggotaKeluarga);
router.post('/editAnggotaKeluarga/:id', isAuth, editAnggotaKeluarga);
router.get('/deleteAnggotaKeluarga/:id', isAuth, deleteAnggotaKeluarga);

module.exports = router;
