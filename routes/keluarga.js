const express = require('express');
const router = express.Router();

router.get('/anggota-keluarga');
router.get('/anggota-keluarga/:id');
router.post('/anggota-keluarga');
router.put('/anggota-keluarga/:id');
router.delete('/anggota-keluarga/:id');

module.exports = router;
