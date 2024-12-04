const express = require('express');
const { calcularReajusteYMulta } = require('../controllers/reajusteController');
const router = express.Router();

router.post('/calcular', calcularReajusteYMulta);

module.exports = router;
