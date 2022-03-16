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
        role: anggota.role,
        keluargaId: anggota.keluargaId._id,
        anggotaId: anggota._id,
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

exports.getLaporan = async (req, res, next) => {
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

      const laporan = await Laporan.find({ keluargaId: keluargaId });

      res.json({ message: 'Laporan berhasil ditemukan', laporan });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.getLaporanById = async (req, res, next) => {
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

      const keluarga = await Keluarga.findOne({ email: email });
      const keluargaId = keluarga._id;

      const laporan = await Laporan.findById(id);

      res.json({ message: 'Laporan By ID berhasil ditemukan', laporan });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.editLaporan = async (req, res, next) => {
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

      const laporan = await Laporan.findById(id);
      const anggotaId = laporan.anggotaId;

      const anggota = await AnggotaKeluarga.findById(anggotaId);

      const newLaporan = {
        nama: anggota.nama,
        role: anggota.role,
        keluargaId: anggota.keluargaId._id,
        anggotaId: anggota._id,
        alamat: anggota.keluargaId.alamat,
        nomorRumah: anggota.keluargaId.nomorRumah,
        rt: anggota.keluargaId.rt,
        gejala: gejala,
        catatan: catatan,
      };

      const updatedLaporan = await Laporan.findByIdAndUpdate(id, newLaporan);

      res.json({ message: 'Laporan berhasil diupdate', updatedLaporan });
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteLaporan = async (req, res, next) => {
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

      await Laporan.findByIdAndDelete(id);

      res.json({ message: 'Berhasil menghapus laporan' });
    }
  } catch (error) {
		/* Handling Errors */
    errorHandling(error);
    next(error);
	}
};
