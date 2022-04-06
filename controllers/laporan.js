const AnggotaKeluarga = require("../models/anggotaKeluarga");
const Keluarga = require("../models/keluarga");
const { errorHandling } = require("./errorHandling");
const { validationResult } = require("express-validator");
const Laporan = require("../models/laporan");
const LocalStorage = require("node-localstorage").LocalStorage;
const localstorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");

exports.addLaporan = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    const token = localstorage.getItem("token");
    const { id } = req.params;
    const { laporan, catatan } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }

      if (!decodedToken) {
        res.render("index");
      } else {
        const anggota = await AnggotaKeluarga.findById(id);
        const newLaporan = await new Laporan({
          anggotaId: anggota._id,
          keluargaId: anggota.keluargaId,
          laporan: laporan,
          catatan: catatan,
        });

        await newLaporan.save();

        res.redirect("/laporan");
      }

      res.render("index");
    });
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

    const token = localstorage.getItem("token");
    const { id } = req.params;
    const { idAnggota, laporan, catatan } = req.body;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }

      if (!decodedToken) {
        res.render("index");
      } else {
        if (decodedToken.role === "Keluarga") {
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

        if (decodedToken.role === "RT") {
          const anggota = await AnggotaKeluarga.findById(id);
          const newLaporan = {
            anggotaId: anggota._id,
            keluargaId: anggota.keluargaId,
            laporan: laporan,
            catatan: catatan,
          };

          await Laporan.findOneAndReplace(id, newLaporan);

          res.redirect("/laporan");
        }
      }

      res.render("index");
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};

exports.deleteLaporan = async (req, res, next) => {
  try {
    const token = localstorage.getItem("token");
    const { id } = req.params;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }

      if (!decodedToken) {
        res.render("index");
      } else {
        await Laporan.findByIdAndDelete(id);

        res.redirect("/laporan");
      }

      res.render("index");
    });
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
