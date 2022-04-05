const express = require("express");
const {
  addLaporan,
  editLaporan,
  deleteLaporan,
} = require("../controllers/laporan");
const router = express.Router();

router.post("/tambahLaporan/:id", addLaporan);
router.post("/editLaporan/:id", editLaporan);
router.get("/deleteLaporan/:id", deleteLaporan);

module.exports = router;
