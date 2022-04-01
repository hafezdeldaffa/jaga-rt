const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');
const RT = require('../models/rt');
const LocalStorage = require('node-localstorage').LocalStorage;
const localstorage = new LocalStorage('./scratch');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// exports.addAnggotaKeluarga = async (req, res, next) => {
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
//       const { nama, role, statusCovid } = req.body;

//       const keluarga = await Keluarga.findOne({ email: email });
//       const keluargaId = keluarga._id;
//       const tokenRT = keluarga.tokenRT;

//       const newAnggota = new AnggotaKeluarga({
//         nama: nama,
//         role: role,
//         statusCovid: statusCovid,
//         tokenRT: tokenRT,
//         keluargaId: keluargaId,
//       });

//       const anggota = await newAnggota.save();

//       res.json({ message: 'Berhasil menambahkan anggota keluarga', anggota });
//     } else {
//       const { nama, role, statusCovid } = req.body;

//       const keluarga = await RT.findOne({ email: email });
//       const keluargaId = keluarga._id;
//       const tokenRT = keluarga._id;

//       const newAnggota = new AnggotaKeluarga({
//         nama: nama,
//         role: role,
//         statusCovid: statusCovid,
//         tokenRT: tokenRT,
//         keluargaId: keluargaId,
//       });

//       const anggota = await newAnggota.save();

//       res.json({ message: 'Berhasil menambahkan anggota keluarga', anggota });
//     }
//   } catch (error) {
//     /* Handling Errors */
//     errorHandling(error);
//     next(error);
//   }
// };

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
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    } */

    // const { id } = req.params;

    /* Get data from jwt */
    /* const { email, role } = req.user;

    if (role === 'Keluarga') {
      const { nama, statusCovid, role } = req.body;

      const newAnggota = {
        nama: nama,
        role: role,
        statusCovid: statusCovid,
      };

      await AnggotaKeluarga.findOneAndUpdate({ _id: id }, newAnggota);

      res.json({ message: 'Update anggota success' });
    } */

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

          const anggota = await AnggotaKeluarga.findByIdAndUpdate(
            id,
            newAnggota
          );
          console.log(anggota);

          /* const anggotaKeluarga = await AnggotaKeluarga.find({
            tokenRT: keluarga.tokenRT,
            keluargaId: keluarga._id,
          }); */

          res.redirect('/keluarga');
          /* const keluarga = await Keluarga.findOne({ email: decodedToken.email });
            res.user = keluarga;
            next(); */
        }

        if (decodedToken.role === 'RT') {
          const keluarga = await RT.findOne({ email: decodedToken.email });
          const newAnggota = {
            nama: nama,
            role: role,
            statusCovid: statusCovid,
          };
          await AnggotaKeluarga.findOneAndUpdate({ _id: id }, newAnggota);

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
