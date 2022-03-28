const Keluarga = require('../models/keluarga');
const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Rt = require('../models/rt');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');
const LocalStorage = require('node-localstorage').LocalStorage;
const localstorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');

exports.getDashboard = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem('token');

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    console.log(decodedToken);

    if (decodedToken.role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: decodedToken.email });
      const anggotaPositif = await AnggotaKeluarga.find({
        tokenRT: keluarga.tokenRT,
        statusCovid: 'Positif',
      });

      res.render('dashboard/dashboard', {
        title: 'Dashboard Jaga-RT',
        keluarga,
        anggotaPositif,
      });
    } else {
      res.render('index')
    }

    if (decodedToken.role === 'RT') {
      const keluarga = await Rt.findOne({ email: decodedToken.email });
      const anggotaPositif = await AnggotaKeluarga.find({
        tokenRT: keluarga._id,
        statusCovid: 'Positif',
      });

      console.log(keluarga);

      res.render('dashboard/dashboard', {
        title: 'Dashboard Jaga-RT',
        keluarga,
        anggotaPositif,
      });
    } else {
      res.render('index')
    }

    res.render('index');
  });
};

exports.checkUser = (req, res, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        next();
      } else {
        let keluarga = await Keluarga.findOne({ email: decodedToken.email });
        res.user = keluarga;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
};
