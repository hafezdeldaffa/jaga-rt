const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');
const RT = require('../models/rt');

exports.addAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      const { nama, role, statusCovid } = req.body;

      const keluarga = await Keluarga.findOne({ email: email });
      const keluargaId = keluarga._id;
      const tokenRT = keluarga.tokenRT;

      const newAnggota = new AnggotaKeluarga({
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        tokenRT: tokenRT,
        keluargaId: keluargaId,
      });

      const anggota = await newAnggota.save();

      // const keluargaUpdated = await Keluarga.findByIdAndUpdate(keluargaId, newKeluarga);

      res.json({ message: 'Berhasil menambahkan anggota keluarga', anggota });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: email });
      const keluargaId = keluarga._id;

      const anggotaKeluarga = await AnggotaKeluarga.find({
        keluargaId: keluargaId,
      }).populate('keluargaId', 'namaKepalaKeluarga nomorRumah rt');

      res.json({ message: 'Anggota keluarga found', anggotaKeluarga });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getAnggotaKeluargaById = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    const { id } = req.params;

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      const anggota = await AnggotaKeluarga.findById(id).populate(
        'keluargaId',
        'namaKepalaKeluarga nomorRumah rt'
      );

      res.json({ message: 'Anggota by id found', anggota });
    }
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

    const { id } = req.params;

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      const { nama, statusCovid, role } = req.body;

      const newAnggota = {
        nama: nama,
        role: role,
        statusCovid: statusCovid,
      };

      await AnggotaKeluarga.findOneAndUpdate({ _id: id }, newAnggota);

      res.json({ message: 'Update anggota success' });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation error, entered data is incorrect');
      error.statusCode = 422;
      throw err;
    }

    const { id } = req.params;

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === 'Keluarga') {
      await AnggotaKeluarga.findByIdAndDelete(id);

      res.json({ message: 'Delete anggota keluarga success' });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
