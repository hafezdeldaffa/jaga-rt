/* 
    CONTROLLERS UNTUK AUTHENTICATE JWT
*/

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Keluarga = require('../models/keluarga');
const Rt = require('../models/rt');
const { errorHandling } = require('./errorHandling');

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

      const findKeluarga = Keluarga.findOne({ email: keluarga.email });

      res
        .status(201)
        .json({ message: 'Akun Keluarga Dibuat', id: findKeluarga._id });
    } else {
      const dataRt = new Rt({
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

      const findRt = Rt.findOne({ email: dataRt.email });

      res.status(201).json({ message: 'Akun RT Dibuat', id: findRt._id });
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
        const error = new Error('Wrong email.');
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

      res.render('index', { token: token });
    } else {
      const rt = await Rt.findOne({ email: email });

      if (!rt) {
        const error = new Error('Wrong email.');
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

      res.render('index', { token: token });
    }
  } catch (error) {
    errorHandling(error);
    next(error);
  }
};
