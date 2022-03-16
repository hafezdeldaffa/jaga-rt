const AnggotaKeluarga = require('../models/anggotaKeluarga');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');
const Laporan = require('../models/laporan');

exports.getDataPositif = async (req, res, next) => {
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
      const tokenRT = keluarga.tokenRT;

      const anggota = await AnggotaKeluarga.find({
        keluargaId: keluargaId,
        statusCovid: 'Positif',
      });

      // const keluargaUpdated = await Keluarga.findByIdAndUpdate(keluargaId, newKeluarga);

      res.json({
        message: 'Berhasil menemnukan anggota keluarga positif',
        anggota,
      });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.addLaporan = async (req, res, next) => {
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
      const { id } = req.params;

      const { gejala, catatan } = req.body;

      const anggota = await AnggotaKeluarga.findById(id).populate(
        'keluargaId',
        'alamat nomorRumah rt'
      );

      const laporan = new Laporan({
        nama: anggota.nama,
        alamat: anggota.keluargaId.alamat,
        nomorRumah: anggota.keluargaId.nomorRumah,
        rt: anggota.keluargaId.rt,
        gejala: gejala,
        catatan: catatan,
      });

      const newLaporan = await laporan.save();

      res.json({ message: 'Laporan berhasil ditambahkan', newLaporan });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
