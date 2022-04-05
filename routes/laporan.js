const express = require("express");
const {
  addLaporan,
  getLaporanById,
  editLaporan,
  deleteLaporan,
} = require("../controllers/laporan");
const router = express.Router();

// router.get("/laporan/:id", getLaporanById);
router.post("/tambahLaporan/:id", addLaporan);
router.post("/editLaporan/:id", editLaporan);
// router.get("/laporan/:id", deleteLaporan);

module.exports = router;
