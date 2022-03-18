const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Jaga RT' });
});

router.get('/login', function (req, res, next) {
  res.render('index/login', { title: 'Login' });
});

module.exports = router;
