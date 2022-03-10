const express = require('express');
const router = express.Router();

router.get('/keluarga');
router.get('/keluarga/:id');
router.post('/keluarga');
router.put('/keluarga/:id');
router.delete('/keluarga/:id');

module.exports = router;
