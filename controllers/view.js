const Keluarga = require("../models/keluarga");
const AnggotaKeluarga = require("../models/anggotaKeluarga");
const { errorHandling } = require("./errorHandling");
const LocalStorage = require("node-localstorage").LocalStorage;
const localstorage = new LocalStorage("./scratch");
const jwt = require("jsonwebtoken");

exports.getDashboard = async (req, res, next) => {
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
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga.tokenRT,
          statusCovid: "Positif",
        });

        res.render("dashboard/dashboard", {
          title: "Dashboard Jaga-RT",
          keluarga,
          anggotaPositif,
        });
        /* const keluarga = await Keluarga.findOne({ email: decodedToken.email });
            res.user = keluarga;
            next(); */
      }

      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          statusCovid: "Positif",
        });

        res.render("dashboard/dashboard", {
          title: "Dashboard Jaga-RT",
          keluarga,
          anggotaPositif,
        });
      }
    }

    res.render("index");
  });
};

exports.getAnggotaDashboard = async (req, res, next) => {
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
        const anggotaKeluarga = await AnggotaKeluarga.find({
          tokenRT: keluarga.tokenRT,
          keluargaId: keluarga._id,
        });

        console.log(req.user);

        res.render("dashboard/anggotaKeluarga", {
          title: "Dashboard Anggota Keluarga",
          keluarga,
          anggotaKeluarga,
        });
      }

      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaKeluarga = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          keluargaId: keluarga._id,
        });

        res.render("dashboard/anggotaKeluarga", {
          title: "Dashboard Anggota Keluarga",
          keluarga,
          anggotaKeluarga,
        });
      }
    }

    res.render("index");
  });
};

exports.getLaporanDashboard = async (req, res, next) => {
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
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga.tokenRT,
          statusCovid: "Positif",
          jwt: token,
        });

        res.render("dashboard/laporan", {
          title: "Dashboard Laporan",
          keluarga,
          anggotaPositif,
        });
        /* const keluarga = await Keluarga.findOne({ email: decodedToken.email });
            res.user = keluarga;
            next(); */
      }

      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const anggotaPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          statusCovid: "Positif",
          jwt: token,
        });

        res.render("dashboard/laporan", {
          title: "Dashboard Laporan",
          keluarga,
          anggotaPositif,
        });
      }
    }

    res.render("index");
  });
};

exports.checkUser = (req, res, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        next();
      } else {
        let keluarga = await Keluarga.findOne({ email: decodedToken.email });
        res.user = keluarga;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
};

exports.getMasyarakatDashboard = async (req, res, next) => {
  /* Get data from localStorage */
  const token = localstorage.getItem("token");

  jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
    if (err) {
      errorHandling(err);
    }

    if (!decodedToken) {
      res.render("index");
    } else {
      if (decodedToken.role === "RT") {
        const keluarga = await Keluarga.findOne({ email: decodedToken.email });
        const masyarakatPositif = await AnggotaKeluarga.find({
          tokenRT: keluarga._id,
          statusCovid: "Positif",
        }).populate("keluargaId", "namaKepalaKeluarga rt alamat nomorRumah");

        console.log(masyarakatPositif);

        res.render("dashboard/masyarakatPositif", {
          title: "Dashboard Masyarakat Positif",
          keluarga,
          masyarakatPositif,
        });
      }
      next();
    }
    res.render("index");
  });
};

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
