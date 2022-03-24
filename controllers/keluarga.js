const Keluarga = require('../models/keluarga');
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
    } else {
      res.render('dashboard/dashboard', {
        title: 'Dashboard Jaga-RT',
        keluarga: decodedToken,
      });
      /* let keluarga = await Keluarga.findOne({ email: decodedToken.email });
          res.user = keluarga;
          next(); */
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
