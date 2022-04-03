const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');
const RT = require('../models/rt');
const LocalStorage = require('node-localstorage').LocalStorage;
const localstorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.addAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    const token = localstorage.getItem('token');
    const { nama, statusCovid, role } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }

      if (!decodedToken) {
        res.render('index');
      } else {
        if (decodedToken.role === 'Keluarga') {
          const keluarga = await Keluarga.findOne({
            email: decodedToken.email,
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

        if (decodedToken.role === 'RT') {
          const keluarga = await RT.findOne({ email: decodedToken.email });
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
      }

      res.render('index');
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

// exports.getAnggotaKeluarga = async (req, res, next) => {
//   try {
//     /* Creating validation */
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = new Error('Validation error, entered data is incorrect');
//       error.statusCode = 422;
//       throw err;
//     }

//     /* Get data from jwt */
//     const { email, role } = req.user;

//     if (role === 'Keluarga') {
//       const keluarga = await Keluarga.findOne({ email: email });
//       const keluargaId = keluarga._id;

//       const anggotaKeluarga = await AnggotaKeluarga.find({
//         keluargaId: keluargaId,
//       }).populate('keluargaId', 'namaKepalaKeluarga nomorRumah rt');

//       res.json({ message: 'Anggota keluarga found', anggotaKeluarga });
//     }
//   } catch (error) {
//     /* Handling Errors */
//     errorHandling(error);
//     next(error);
//   }
// };

// exports.getAnggotaKeluargaById = async (req, res, next) => {
//   try {
//     /* Creating validation */
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const error = new Error('Validation error, entered data is incorrect');
//       error.statusCode = 422;
//       throw err;
//     }

//     const { id } = req.params;

//     /* Get data from jwt */
//     const { email, role } = req.user;

//     if (role === 'Keluarga') {
//       const anggota = await AnggotaKeluarga.findById(id).populate(
//         'keluargaId',
//         'namaKepalaKeluarga nomorRumah rt'
//       );

//       res.json({ message: 'Anggota by id found', anggota });
//     }
//   } catch (error) {
//     /* Handling Errors */
//     errorHandling(error);
//     next(error);
//   }
// };

exports.editAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    const token = localstorage.getItem('token');
    const { id } = req.params;
    const { nama, statusCovid, role } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }

      if (!decodedToken) {
        res.render('index');
      } else {
        if (decodedToken.role === 'Keluarga') {
          const keluarga = await Keluarga.findOne({
            email: decodedToken.email,
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

        if (decodedToken.role === 'RT') {
          const keluarga = await RT.findOne({
            email: decodedToken.email,
          });
          const newAnggota = {
            nama: nama,
            role: role,
            statusCovid: statusCovid,
            keluargaId: keluarga._id,
            tokenRT: keluarga._id,
          };

          await AnggotaKeluarga.findByIdAndUpdate(id, newAnggota);

          res.redirect('/keluarga');
        }
      }

      res.render('index');
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteAnggotaKeluarga = async (req, res, next) => {
  try {
    const token = localstorage.getItem('token');
    const { id } = req.params;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }

      if (!decodedToken) {
        res.render('index');
      } else {
        await AnggotaKeluarga.findByIdAndDelete(id);

        res.redirect('/keluarga');
      }

      res.render('index');
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
