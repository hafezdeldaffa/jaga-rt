const express = require('express');
const { getDashboard, getAnggotaDashboard, getLaporanDashboard } = require('../controllers/keluarga');
const router = express.Router();
const { pieChart, dailyData } = require('../controllers/covidData');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Jaga RT' });
});

router.get('/login', function (req, res, next) {
  res.render('index/login', { title: 'Login' });
});

router.get('/signup', function (req, res, next) {
  res.render('index/signup', { title: 'Daftar' });
});

router.get('/dashboard', getDashboard);
router.get('/keluarga', getAnggotaDashboard);
router.get('/laporan', getLaporanDashboard);

router.get('/piechartData', pieChart);
router.get('/dailyData', dailyData);

module.exports = router;
