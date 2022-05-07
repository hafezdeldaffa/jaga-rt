const AnggotaKeluarga = require("../models/anggotaKeluarga");
const { errorHandling } = require("./errorHandling");
const { validationResult } = require("express-validator");
const Laporan = require("../models/laporan");

exports.addLaporan = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;
    const { laporan, catatan } = req.body;

    const anggota = await AnggotaKeluarga.findById(id);
    const newLaporan = await new Laporan({
      anggotaId: anggota._id,
      keluargaId: anggota.keluargaId,
      laporan: laporan,
      catatan: catatan,
    });

    if (user) {
      await newLaporan.save();
    }

    res.redirect("/laporan");
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
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;
    const { idAnggota, laporan, catatan } = req.body;

    if (user.role === "Keluarga") {
      const anggota = await AnggotaKeluarga.findById(idAnggota);
      const newLaporan = {
        anggotaId: anggota._id,
        keluargaId: anggota.keluargaId,
        laporan: laporan,
        catatan: catatan,
      };

      await Laporan.findOneAndReplace(id, newLaporan);

      res.redirect("/laporan");
    }

    if (user.role === "RT") {
      const anggota = await AnggotaKeluarga.findById(idAnggota);
      console.log(anggota);
      const newLaporan = {
        anggotaId: anggota._id,
        keluargaId: anggota.keluargaId,
        laporan: laporan,
        catatan: catatan,
      };

      await Laporan.findOneAndReplace(id, newLaporan);

      res.redirect("/laporan");
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteLaporan = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;

    if (!user) {
      res.render("index");
    } else {
      await Laporan.findByIdAndDelete(id);
      res.redirect("/laporan");
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
