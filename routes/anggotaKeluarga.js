const express = require('express');
const router = express.Router();

router.get('/anggotaKeluarga');
router.get('/anggotaKeluarga/:id');
router.post('/anggotaKeluarga');
router.put('/anggotaKeluarga/:id');
router.delete('/anggotaKeluarga/:id');

module.exports = router;
