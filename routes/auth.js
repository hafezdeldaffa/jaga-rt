const express = require('express');
const {
  signUp,
  login,
  authenticateJWT,
  logout,
  checkUser,
} = require('../controllers/auth');
const router = express.Router();
const { body } = require('express-validator');
const Keluarga = require('../models/keluarga');
const Rt = require('../models/rt');
const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

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

/* passport.use(
  new local_strategy(async (email, password, done) => {
    try {
      const row = await Keluarga.findOne({ email: email });

      if (row == null) {
        return done(null, false);
      } else {
        if (bcrypt.compareSync(password, row.password)) {
          return done(null, row);
        } else {
          return done(null, false);
        }
      }
    } catch (error) {
      return done(error);
    }
  })
);

router.all('*', (req, res, next) => {
  if (req.cookies) {
    // how to pass to the next layer ? load the routes below code etc..
    next();
  } else {
    res.redirect('/login');
  }
}); */

router.post('/dashboard', login);

router.get('/logout', logout);

module.exports = router;
