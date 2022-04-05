/* 
    CONTROLLERS UNTUK AUTHENTICATE JWT
*/

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Keluarga = require('../models/keluarga');
const { errorHandling } = require('./errorHandling');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

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

      const token = jwt.sign(
        {
          email: user.email,
          password: user.password,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: '3h' }
      );

      localStorage.setItem('token', token);

      const fixedToken = localStorage.getItem('token');
      console.log(fixedToken);

      if (fixedToken) {
        res.redirect('/dashboard');
      }

      next();
    } 
    else if (role === 'RT') {
      const rt = await Keluarga.findOne({ email: email });

      if (!rt) {
        const error = new Error('Wrong data. Please check your login data!');
        error.statusCode = 401;
        throw error;
      }

      user = rt;
      const truePassword = await bcrypt.compare(password, user.password);

      if (!truePassword) {
        const error = new Error('Wrong password.');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: user.email,
          password: user.password,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: '3h' }
      );

      localStorage.setItem('token', token);

      const fixedToken = localStorage.getItem('token');
      console.log(fixedToken);

      if (fixedToken) {
        res.redirect('/dashboard');
      }

      next();
    } else {
      next();
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  localStorage.removeItem('token');
  res.redirect('/');
};

exports.checkUser = (req, res, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        next();
      } else if (decodedToken.role === 'RT') {
        res.rt = decodedToken;
        next();
      } else {
        res.keluarga = decodedToken;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
};
