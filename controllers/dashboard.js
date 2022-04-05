const Keluarga = require('../models/keluarga');
const AnggotaKeluarga = require('../models/anggotaKeluarga');
const { errorHandling } = require('./errorHandling');
const LocalStorage = require('node-localstorage').LocalStorage;
const localstorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');
const Laporan = require('../models/laporan');

exports.getDashboard = async (req, res, next) => {
  /* Get data from session */
  const user = req.session.user;
  try {
    if (user.role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaPositif = await AnggotaKeluarga.find({
        tokenRT: keluarga.tokenRT,
        statusCovid: 'Positif',
      });

      res.render('dashboard/dashboard', {
        title: 'Dashboard Jaga-RT',
        keluarga,
        anggotaPositif,
      });
    }

    if (user.role === 'RT') {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaPositif = await AnggotaKeluarga.find({
        tokenRT: keluarga._id,
        statusCovid: 'Positif',
      });

      res.render('dashboard/dashboard', {
        title: 'Dashboard Jaga-RT',
        keluarga,
        anggotaPositif,
      });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getAnggotaDashboard = async (req, res, next) => {
  /* Get data from session */
  const user = req.session.user;

  try {
    if (user.role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaKeluarga = await AnggotaKeluarga.find({
        tokenRT: keluarga.tokenRT,
        keluargaId: keluarga._id,
      });

      res.render('dashboard/anggotaKeluarga', {
        title: 'Dashboard Anggota Keluarga',
        keluarga,
        anggotaKeluarga,
      });
    }

    if (user.role === 'RT') {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaKeluarga = await AnggotaKeluarga.find({
        tokenRT: keluarga._id,
        keluargaId: keluarga._id,
      });

      res.render('dashboard/anggotaKeluarga', {
        title: 'Dashboard Anggota Keluarga',
        keluarga,
        anggotaKeluarga,
      });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getLaporanDashboard = async (req, res, next) => {
  /* Get data from session */
  const user = req.session.user;

  try {
    if (user.role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaPositif = await AnggotaKeluarga.find({
        keluargaId: keluarga._id,
        statusCovid: 'Positif',
      }).populate('keluargaId', 'namaKepalaKeluarga nomorRumah');

      res.render('dashboard/laporan', {
        title: 'Dashboard Laporan',
        keluarga,
        anggotaPositif,
      });
    }

    if (user.role === 'RT') {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaPositif = await AnggotaKeluarga.find({
        keluargaId: keluarga._id,
        statusCovid: 'Positif',
      }).populate('keluargaId', 'namaKepalaKeluarga nomorRumah');

      res.render('dashboard/laporan', {
        title: 'Dashboard Laporan',
        keluarga,
        anggotaPositif,
      });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getMasyarakatDashboard = async (req, res, next) => {
  /* Get data from session */
  const user = req.session.user;

  if (user.role === 'RT') {
    const keluarga = await Keluarga.findOne({ email: user.email });
    const masyarakatPositif = await AnggotaKeluarga.find({
      tokenRT: keluarga._id,
      statusCovid: 'Positif',
    }).populate('keluargaId', 'namaKepalaKeluarga rt rw alamat nomorRumah');

    const laporan = await Laporan.find().populate(
      'anggotaId keluargaId',
      'nama statusCovid namaKepalaKeluarga rt rw alamat nomorRumah'
    );

    res.render('dashboard/masyarakatPositif', {
      title: 'Dashboard Masyarakat Positif',
      keluarga,
      masyarakatPositif,
      laporan,
    });
  }
  next();
};
