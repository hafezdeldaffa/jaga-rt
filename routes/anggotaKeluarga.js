const express = require('express');
const { addAnggotaKeluarga, getAnggotaKeluarga } = require('../controllers/anggotaKeluarga');
const { authenticateJWT } = require('../controllers/auth');
const router = express.Router();

router.get('/anggotaKeluarga', authenticateJWT, getAnggotaKeluarga);
router.get('/anggotaKeluarga/:id');
router.post('/anggotaKeluarga', authenticateJWT, addAnggotaKeluarga);
router.put('/anggotaKeluarga/:id');
router.delete('/anggotaKeluarga/:id');

module.exports = router;
