const express = require('express');
const { authenticateJWT, checkUser } = require('../controllers/auth');
const { getDashboard } = require('../controllers/keluarga');
const router = express.Router();
const jwt = require('jsonwebtoken');
const LocalStorage = require('node-localstorage').LocalStorage;
const localstorage = new LocalStorage('./scratch');
const Keluarga = require('../models/keluarga');

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

module.exports = router;
