const express = require('express');
const { signUp, login } = require('../controllers/auth');
const router = express.Router();
const { body } = require('express-validator');
const Keluarga = require('../models/keluarga');
const Rt = require('../models/rt');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please add a valid email')
      .custom((value, { req }) => {
        if (req.body.tokenRT) {
          return Keluarga.findOne({ email: value }).then((keluarga) => {
            if (keluarga) {
              return new Promise.reject(
                'E-Mail sudah terdaftar, harap gunakan email lain!'
              );
            }
          });
        } else {
          return Rt.findOne({ email: value }).then((rt) => {
            if (rt) {
              return new Promise.reject(
                'E-Mail sudah terdaftar, harap gunakan email lain!'
              );
            }
          });
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('role').trim().not().isEmpty(),
  ],
  signUp
);

router.post('/login', login);

module.exports = router;