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
  getDetailLaporanForm,
  getProfile,
} = require("../controllers/form");
const { isAuth } = require("../controllers/auth");

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
router.get("/dashboard", isAuth, getDashboard);
router.get("/keluarga", isAuth, getAnggotaDashboard);
router.get("/laporan", isAuth, getLaporanDashboard);

/* Get Masyarakat Positif Dashboard */
router.get("/masyarakat", isAuth, getMasyarakatDashboard);

/* Get Edit & Add AnggotaKeluarga Form */
router.get("/editAnggota/:id", isAuth, getEditAnggotaForm);
router.get("/tambahAnggota", isAuth, getTambahAnggotaForm);

/* Get Add, Edit, & Detail Laporan Form */
router.get("/tambahLaporanForm/:id", isAuth, getTambahLaporanForm);
router.get("/editLaporanForm/:id", isAuth, getEditLaporanForm);
router.get("/detailLaporanForm/:id", isAuth, getDetailLaporanForm);

router.get("/profile/:id", isAuth, getProfile);

/* Get Chart Data & Show on Dashboard */
router.get("/piechartData", pieChart);
router.get("/dailyData", dailyData);

module.exports = router;
