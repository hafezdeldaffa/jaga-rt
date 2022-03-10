const express = require('express');
const { addAnggotaKeluarga } = require('../controllers/anggotaKeluarga');
const { authenticateJWT } = require('../controllers/auth');
const router = express.Router();

router.get('/anggotaKeluarga');
router.get('/anggotaKeluarga/:id');
router.post('/anggotaKeluarga', authenticateJWT, addAnggotaKeluarga);
router.put('/anggotaKeluarga/:id');
router.delete('/anggotaKeluarga/:id');

module.exports = router;
