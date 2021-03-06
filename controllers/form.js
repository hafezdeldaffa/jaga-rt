const Keluarga = require("../models/keluarga");
const AnggotaKeluarga = require("../models/anggotaKeluarga");
const Laporan = require("../models/laporan");
const { errorHandling } = require("./errorHandling");

exports.getEditAnggotaForm = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;
    const { id } = req.params;

    if (user.role === "Keluarga") {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaKeluarga = await AnggotaKeluarga.findById(id);

      res.render("forms/editAnggotaForm", {
        title: "Edit Anggota Keluarga",
        keluarga,
        anggotaKeluarga,
      });
    }

    if (user.role === "RT") {
      const keluarga = await Keluarga.findOne({ email: user.email });
      const anggotaKeluarga = await AnggotaKeluarga.findById(id);

      res.render("forms/editAnggotaForm", {
        title: "Edit Anggota Keluarga",
        keluarga,
        anggotaKeluarga,
      });
    }

    res.render("index");
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};

exports.getTambahAnggotaForm = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;

    if (user.role === "Keluarga") {
      const keluarga = await Keluarga.findOne({ email: user.email });

      res.render("forms/tambahAnggotaForm", {
        title: "Tambah Anggota Keluarga",
        keluarga,
      });
    }
    if (user.role === "RT") {
      const keluarga = await Keluarga.findOne({
        email: user.email,
      });

      res.render("forms/tambahAnggotaForm", {
        title: "Tambah Anggota Keluarga",
        keluarga,
      });
    }
    res.render("index");
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};

exports.getTambahLaporanForm = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;

    const keluarga = await Keluarga.findOne({ email: user.email });
    const anggotaKeluarga = await AnggotaKeluarga.findOne({
      _id: id,
      keluargaId: keluarga._id,
      statusCovid: "Positif",
    }).populate("keluargaId", "namaKepalaKeluarga nomorRumah");
    const laporan = await Laporan.findOne({
      anggotaId: id,
      keluargaId: keluarga._id,
    });

    res.render("forms/tambahLaporanForm", {
      title: "Tambah Laporan Keluarga",
      keluarga,
      anggotaKeluarga,
      laporan,
    });
    res.render("index");
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};

exports.getEditLaporanForm = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;

    const keluarga = await Keluarga.findOne({ email: user.email });
    const anggotaKeluarga = await AnggotaKeluarga.findOne({
      _id: id,
      keluargaId: keluarga._id,
      statusCovid: "Positif",
    }).populate("keluargaId", "namaKepalaKeluarga nomorRumah");

    const laporan = await Laporan.findOne({
      anggotaId: id,
      keluargaId: keluarga._id,
    });

    res.render("forms/editLaporanForm", {
      title: "Edit Laporan Keluarga",
      keluarga,
      anggotaKeluarga,
      laporan,
    });
    res.render("index");
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};

exports.getDetailLaporanForm = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;

    const keluarga = await Keluarga.findOne({ email: user.email });
    const anggotaKeluarga = await AnggotaKeluarga.findOne({
      _id: id,
      statusCovid: "Positif",
    });

    const laporan = await Laporan.findOne({
      anggotaId: id,
    });

    res.render("forms/detailLaporanForm", {
      title: "Detail Laporan Keluarga",
      keluarga,
      anggotaKeluarga,
      laporan,
    });
    res.render("index");
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    /* Get data from session */
    const user = req.session.user;

    const { id } = req.params;

    if (user) {
      const keluarga = await Keluarga.findById(id);

      res.render("forms/editProfile", {
        title: "Edit Profile Page",
        keluarga,
      });
    }
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};
