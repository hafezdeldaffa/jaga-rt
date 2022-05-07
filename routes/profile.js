const express = require('express');
const { isAuth } = require('../controllers/auth');
const { editProfile, editPassword } = require('../controllers/profile');
const { body, check } = require('express-validator');
const router = express.Router();

router.post('/editProfile/:id', isAuth, editProfile);
router.post(
  '/editPassword/:id',
  body('password').trim().isLength({ min: 8 }),
  body('confirm_password')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      // Indicates the success of this synchronous custom validator
      return true;
    }),
  isAuth,
  editPassword
);

module.exports = router;
