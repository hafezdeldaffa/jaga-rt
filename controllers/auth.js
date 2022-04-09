const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const {
      namaKepalaKeluarga,
      email,
      provinsi,
      rt,
      rw,
      kodePos,
      nomorRumah,
      alamat,
      role,
      password,
      tokenRT,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 14);

    if (role === 'Keluarga' && tokenRT) {
      const keluarga = new Keluarga({
        namaKepalaKeluarga: namaKepalaKeluarga,
        email: email,
        provinsi: provinsi,
        rt: rt,
        rw: rw,
        kodePos: kodePos,
        nomorRumah: nomorRumah,
        alamat: alamat,
        role: role,
        password: hashedPassword,
        tokenRT: tokenRT,
      });

      await keluarga.save();

      req.keluarga = await Keluarga.findOne({ email: keluarga.email });

      res.status(201).redirect('/login');
    } else {
      const dataRt = new Keluarga({
        namaKepalaKeluarga: namaKepalaKeluarga,
        email: email,
        provinsi: provinsi,
        rt: rt,
        rw: rw,
        kodePos: kodePos,
        nomorRumah: nomorRumah,
        alamat: alamat,
        password: hashedPassword,
        role: role,
      });

      await dataRt.save();

      req.keluarga = await Keluarga.findOne({ email: dataRt.email });

      res.status(201).redirect('/login');
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  let user;

  try {
    if (role === 'Keluarga') {
      const keluarga = await Keluarga.findOne({ email: email });

      if (!keluarga) {
        const error = new Error('Wrong data. Please check your login data!');
        error.statusCode = 401;
        throw error;
      }

      user = keluarga;
      const truePassword = await bcrypt.compare(password, user.password);

      if (!truePassword) {
        const error = new Error('Wrong password.');
        error.statusCode = 401;
        throw error;
      }

      if (truePassword) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect('/dashboard');
        });
      }
    } else if (role === 'RT') {
      const rt = await Keluarga.findOne({ email: email });

      if (!rt) {
        const error = new Error('Wrong data. Please check your login data!');
        error.statusCode = 401;
        throw error;
      }

      user = rt;
      console.log(user);
      const truePassword = await bcrypt.compare(password, user.password);

      if (!truePassword) {
        const error = new Error('Wrong password.');
        error.statusCode = 401;
        throw error;
      }

      if (truePassword) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect('/dashboard');
        });
      }
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};

exports.isAuth = async (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
};
