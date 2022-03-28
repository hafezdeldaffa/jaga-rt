const Keluarga = require('../models/keluarga');
const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Rt = require('../models/rt');
const { errorHandling } = require('./errorHandling');
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

    if (!decodedToken) {
      res.render('index');
    } else {
      if (decodedToken.role === 'Keluarga') {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga.tokenRT,
          statusCovid: 'Positif',
          jwt: token,
        });

        res.render('dashboard/dashboard', {
          title: 'Dashboard Jaga-RT',
          keluarga,
          anggotaPositif,
        });
        /* const keluarga = await Keluarga.findOne({ email: decodedToken.email });
            res.user = keluarga;
            next(); */
      }

      if (decodedToken.role === 'RT') {
        const keluarga = await Rt.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          statusCovid: 'Positif',
          jwt: token,
        });

        console.log(keluarga);

        res.render('dashboard/dashboard', {
          title: 'Dashboard Jaga-RT',
          keluarga,
          anggotaPositif,
        });
      }
    }

    res.render('index');
  });
};

exports.getAnggotaDashboard = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem('token');

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    console.log(decodedToken);

    if (!decodedToken) {
      res.render('index');
    } else {
      if (decodedToken.role === 'Keluarga') {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga.tokenRT,
          statusCovid: 'Positif',
          jwt: token,
        });

        res.render('dashboard/anggotaKeluarga', {
          title: 'Dashboard Jaga-RT',
          keluarga,
          anggotaPositif,
        });
        /* const keluarga = await Keluarga.findOne({ email: decodedToken.email });
            res.user = keluarga;
            next(); */
      }

      if (decodedToken.role === 'RT') {
        const keluarga = await Rt.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          statusCovid: 'Positif',
          jwt: token,
        });

        console.log(keluarga);

        res.render('dashboard/anggotaKeluarga', {
          title: 'Dashboard Jaga-RT',
          keluarga,
          anggotaPositif,
        });
      }
    }

    res.render('index');
  });
};

exports.getLaporanDashboard = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem('token');

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    console.log(decodedToken);

    if (!decodedToken) {
      res.render('index');
    } else {
      if (decodedToken.role === 'Keluarga') {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga.tokenRT,
          statusCovid: 'Positif',
          jwt: token,
        });

        res.render('dashboard/laporan', {
          title: 'Dashboard Jaga-RT',
          keluarga,
          anggotaPositif,
        });
        /* const keluarga = await Keluarga.findOne({ email: decodedToken.email });
            res.user = keluarga;
            next(); */
      }

      if (decodedToken.role === 'RT') {
        const keluarga = await Rt.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          statusCovid: 'Positif',
          jwt: token,
        });

        console.log(keluarga);

        res.render('dashboard/laporan', {
          title: 'Dashboard Jaga-RT',
          keluarga,
          anggotaPositif,
        });
      }
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
