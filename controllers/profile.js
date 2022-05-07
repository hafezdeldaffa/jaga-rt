const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.editProfile = async (req, res, next) => {
  try {
    const user = req.session.user;

    const { id } = req.params;

    const {
      namaKepalaKeluarga,
      role,
      email,
      alamat,
      provinsi,
      tokenRT,
      rt,
      rw,
      nomorRumah,
      kodePos,
      password,
    } = req.body;

    if (user.role === 'Keluarga') {
      const hashedPassword = await bcrypt.hash(password, 14);

      const newKeluarga = {
        namaKepalaKeluarga: namaKepalaKeluarga,
        role: role,
        tokenRT: tokenRT,
        email: email,
        alamat: alamat,
        password: hashedPassword,
        provinsi: provinsi,
        rt: rt,
        rw: rw,
        nomorRumah: nomorRumah,
        kodePos: kodePos,
      };

      const keluarga = await Keluarga.findByIdAndUpdate(id, newKeluarga);
      console.log(keluarga);

      res.redirect('/dashboard');
    } else if (user.role === 'RT') {
      const hashedPassword = await bcrypt.hash(password, 14);

      const newKeluarga = {
        namaKepalaKeluarga: namaKepalaKeluarga,
        role: role,
        email: email,
        alamat: alamat,
        provinsi: provinsi,
        password: hashedPassword,
        rt: rt,
        rw: rw,
        nomorRumah: nomorRumah,
        kodePos: kodePos,
      };
      await Keluarga.findByIdAndUpdate(id, newKeluarga);

      res.redirect('/dashboard');
    }
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};

exports.editPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error('Error Password not match');
      error.statusCode = 422;
      error.data = error.errors;
      next(error);
    }

    const user = req.session.user;

    const { id } = req.params;

    const { password, confirm_password } = req.body;

    if (user.role === 'Keluarga') {
      const hashedPassword = await bcrypt.hash(password, 14);

      const keluarga = await Keluarga.findById(id);

      if (password !== confirm_password) {
        res.error('Error password not match');
      }

      const newKeluarga = {
        namaKepalaKeluarga: keluarga.namaKepalaKeluarga,
        role: keluarga.role,
        tokenRT: keluarga.tokenRT,
        email: keluarga.email,
        alamat: keluarga.alamat,
        password: hashedPassword,
        provinsi: keluarga.provinsi,
        rt: keluarga.rt,
        rw: keluarga.rw,
        nomorRumah: keluarga.nomorRumah,
        kodePos: keluarga.kodePos,
      };

      await Keluarga.findByIdAndUpdate(id, newKeluarga);

      res.status(201).redirect('/dashboard');
    } else if (user.role === 'RT') {
      const hashedPassword = await bcrypt.hash(password, 14);

      const keluarga = await Keluarga.findById(id);

      const newKeluarga = {
        namaKepalaKeluarga: keluarga.namaKepalaKeluarga,
        role: keluarga.role,
        tokenRT: keluarga.tokenRT,
        email: keluarga.email,
        alamat: keluarga.alamat,
        password: hashedPassword,
        provinsi: keluarga.provinsi,
        rt: keluarga.rt,
        rw: keluarga.rw,
        nomorRumah: keluarga.nomorRumah,
        kodePos: keluarga.kodePos,
      };

      await Keluarga.findByIdAndUpdate(id, newKeluarga);

      res.status(201).redirect('/dashboard');
    }
  } catch (error) {
    errorHandling(error);
    throw error;
  }
};
