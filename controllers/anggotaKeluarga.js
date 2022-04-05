const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');

exports.addAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from session */
    const user = req.session.user;

    const { nama, statusCovid, role } = req.body;

    if (user.role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({
        email: user.email,
      });
      const newAnggota = new AnggotaKeluarga({
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        keluargaId: keluarga._id,
        tokenRT: keluarga.tokenRT,
      });

      await newAnggota.save();

      res.redirect('/keluarga');
    }

    if (user.role === 'RT') {
      const keluarga = await Keluarga.findOne({
        email: user.email,
      });
      const newAnggota = new AnggotaKeluarga({
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        keluargaId: keluarga._id,
        tokenRT: keluarga._id,
      });

      await newAnggota.save();

      res.redirect('/keluarga');
    }

    res.render('index');
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;
    const { nama, statusCovid, role } = req.body;

    if (user.role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({
        email: user.email,
      });
      const newAnggota = {
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        keluargaId: keluarga._id,
        tokenRT: keluarga.tokenRT,
      };

      await AnggotaKeluarga.findByIdAndUpdate(id, newAnggota);

      res.redirect('/keluarga');
    }

    if (user.role === 'RT') {
      const keluarga = await Keluarga.findOne({
        email: user.email,
      });
      const newAnggota = {
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        keluargaId: keluarga._id,
        tokenRT: keluarga._id,
      };

      console.log(newAnggota);

      await AnggotaKeluarga.findByIdAndUpdate(id, newAnggota);

      res.redirect('/keluarga');
    }

    res.render('index');
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;
    const { id } = req.params;

    if (user) {
      await AnggotaKeluarga.findByIdAndDelete(id);
      res.redirect('/keluarga');
    }

    res.render('index');
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
