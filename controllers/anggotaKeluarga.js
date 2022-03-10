const AnggotaKeluarga = require("../models/anggotaKeluarga");
const Keluarga = require('../models/keluarga');
const {errorHandling} = require('./errorHandling');
const { validationResult } = require('express-validator');

exports.addAnggotaKeluarga = async (req, res, next) => {
  try {
    /* Creating validation */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error, entered data is incorrect");
      error.statusCode = 422;
      throw err;
    }

    /* Get data from jwt */
    const { email, role } = req.user;

    if (role === "Keluarga") {
      const { nama, role, statusCovid } = req.body;

      const keluarga = await Keluarga.findOne({email: email});
      const keluargaId = keluarga._id;

      const newAnggota = new AnggotaKeluarga({
        nama: nama,
        role: role,
        statusCovid: statusCovid,
        keluargaId: keluargaId
      });

      const anggota = await newAnggota.save();


      
      // const keluargaUpdated = await Keluarga.findByIdAndUpdate(keluargaId, newKeluarga);

      res.json({message: "Berhasil menambahkan anggota keluarga", anggota})
    }
  } catch (error) {
    /* Handling Errors */
    errorHandling(error);
    next(error);
  }
};
