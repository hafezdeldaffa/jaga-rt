const express = require("express");
const {
  getDashboard,
  getAnggotaDashboard,
  getLaporanDashboard,
  getMasyarakatDashboard,
} = require("../controllers/dashboard");
const router = express.Router();
const { pieChart, dailyData } = require("../controllers/covidData");
const {
  getEditAnggotaForm,
  getTambahAnggotaForm,
  getTambahLaporanForm,
  getEditLaporanForm,
} = require("../controllers/form");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Jaga RT" });
});

router.get("/login", function (req, res, next) {
  res.render("index/login", { title: "Login" });
});

router.get("/signup", function (req, res, next) {
  res.render("index/signup", { title: "Daftar" });
});

/* Get Dashboard, Keluarga, & Laporan routes */
router.get("/dashboard", getDashboard);
router.get("/keluarga", getAnggotaDashboard);
router.get("/laporan", getLaporanDashboard);

/* Get Masyarakat Positif Dashboard */
router.get("/masyarakat", getMasyarakatDashboard);

/* Get Edit & Add AnggotaKeluarga Form */
router.get("/editAnggota/:id", getEditAnggotaForm);
router.get("/tambahAnggota", getTambahAnggotaForm);

/* Get Add, Edit, Delete, & Detail Laporan Form */
router.get("/tambahLaporanForm/:id", getTambahLaporanForm);
router.get("/editLaporanForm/:id", getEditLaporanForm);

/* Get Chart Data & Show on Dashboard */
router.get("/piechartData", pieChart);
router.get("/dailyData", dailyData);

module.exports = router;
