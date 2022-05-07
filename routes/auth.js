const express = require('express');
const { signUp, login, logout } = require('../controllers/auth');
const router = express.Router();
const { body } = require('express-validator');
const Keluarga = require('../models/keluarga');

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please add a valid email')
      .custom(async (value, { req }) => {
        if (req.body.tokenRT) {
          return await Keluarga.findOne({ email: value }).then((keluarga) => {
            if (keluarga) {
              return new Promise.reject(
                'E-Mail sudah terdaftar, harap gunakan email lain!'
              );
            }
          });
        } else {
          return await Keluarga.findOne({ email: value }).then((rt) => {
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
    body('confirm_password')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          const err = new Error(
            'Password confirmation does not match password'
          );
          throw err;
        }

        // Indicates the success of this synchronous custom validator
        return true;
      }),
    body('role').trim().not().isEmpty(),
  ],
  signUp
);

router.post('/dashboard', login);

router.get('/logout', logout);

module.exports = router;
