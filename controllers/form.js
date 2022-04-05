const LocalStorage = require("node-localstorage").LocalStorage;
const localstorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");
const Keluarga = require("../models/keluarga");
const AnggotaKeluarga = require("../models/anggotaKeluarga");
const Laporan = require("../models/laporan");

exports.getEditAnggotaForm = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem("token");
  const { id } = req.params;

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    if (!decodedToken) {
      res.render("index");
    } else {
      if (decodedToken.role === "Keluarga") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaKeluarga = await AnggotaKeluarga.findById(id);

        res.render("forms/editAnggotaForm", {
          title: "Edit Anggota Keluarga",
          keluarga,
          anggotaKeluarga,
        });
      }

      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaKeluarga = await AnggotaKeluarga.findById(id);

        res.render("forms/editAnggotaForm", {
          title: "Edit Anggota Keluarga",
          keluarga,
          anggotaKeluarga,
        });
      }
    }

    res.render("index");
  });
};

exports.getTambahAnggotaForm = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem("token");

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    if (!decodedToken) {
      res.render("index");
    } else {
      if (decodedToken.role === "Keluarga") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });

        res.render("forms/tambahAnggotaForm", {
          title: "Tambah Anggota Keluarga",
          keluarga,
        });
      }
      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({
          email: decodedToken.email,
        });

        res.render("forms/tambahAnggotaForm", {
          title: "Tambah Anggota Keluarga",
          keluarga,
        });
      }
    }

    res.render("index");
  });
};

exports.getTambahLaporanForm = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem("token");
  const { id } = req.params;

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    if (!decodedToken) {
      res.render("index");
    } else {
      if (decodedToken.role === "Keluarga") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaKeluarga = await AnggotaKeluarga.findOne({
          _id: id,
          keluargaId: keluarga._id,
          statusCovid: "Positif",
        }).populate("keluargaId", "namaKepalaKeluarga nomorRumah");

        res.render("forms/tambahLaporanForm", {
          title: "Tambah Laporan Keluarga",
          keluarga,
          anggotaKeluarga,
        });
      }
      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({
          email: decodedToken.email,
        });
        const anggotaKeluarga = await AnggotaKeluarga.find({
          _id: id,
          keluargaId: keluarga._id,
          statusCovid: "Positif",
        }).populate("keluargaId", "namaKepalaKeluarga nomorRumah");

        res.render("forms/tambahLaporanForm", {
          title: "Tambah Laporan Keluarga",
          keluarga,
          anggotaKeluarga,
        });
      }
    }

    res.render("index");
  });
};

exports.getEditLaporanForm = async (req, res, next) => {
    /* Get data from localStorage */
    const token = localstorage.getItem("token");
    const { id } = req.params;
  
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        errorHandling(err);
      }
  
      if (!decodedToken) {
        res.render("index");
      } else {
        if (decodedToken.role === "Keluarga") {
          const keluarga = await Keluarga.findOne({ email: decodedToken.email });
          const anggotaKeluarga = await AnggotaKeluarga.findOne({
            _id: id,
            keluargaId: keluarga._id,
            statusCovid: "Positif",
          }).populate("keluargaId", "namaKepalaKeluarga nomorRumah");

          const laporan = await Laporan.findOne({anggotaId: id, keluargaId: keluarga._id})
  
          res.render("forms/editLaporanForm", {
            title: "Edit Laporan Keluarga",
            keluarga,
            anggotaKeluarga,
            laporan
          });
        }
        if (decodedToken.role === "RT") {
          const keluarga = await Keluarga.findOne({
            email: decodedToken.email,
          });
          const anggotaKeluarga = await AnggotaKeluarga.find({
            _id: id,
            keluargaId: keluarga._id,
            statusCovid: "Positif",
          }).populate("keluargaId", "namaKepalaKeluarga nomorRumah");

          const laporan = await Laporan.findOne({anggotaId: id, keluargaId: keluarga._id})
  
          res.render("forms/editLaporanForm", {
            title: "Edit Laporan Keluarga",
            keluarga,
            anggotaKeluarga,
            laporan
          });
        }
      }
  
      res.render("index");
    });
  };
