const express = require('express');
const { isAuth } = require('../controllers/auth');
const {
  addLaporan,
  editLaporan,
  deleteLaporan,
} = require('../controllers/laporan');
const router = express.Router();

router.post('/tambahLaporan/:id', isAuth, addLaporan);
router.post('/editLaporan/:id', isAuth, editLaporan);
router.get('/deleteLaporan/:id', isAuth, deleteLaporan);

module.exports = router;
