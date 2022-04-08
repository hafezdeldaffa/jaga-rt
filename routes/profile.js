const express = require("express");
const { isAuth } = require("../controllers/auth");
const router = express.Router();

router.post("/editProfile", isAuth);
router.post("/editPassword", isAuth);

module.exports = router;
