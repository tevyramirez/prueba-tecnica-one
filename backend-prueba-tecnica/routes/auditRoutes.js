const express = require('express');
const auditoriaController = require('../controllers/auditoriaController');

const router = express.Router();

// Crear auditoria
router.post('/auditoria', auditoriaController.crearAuditoria);

// Traer todas las auditorias
router.get('/auditorias', auditoriaController.getAllAuditorias);

// Traer auditorias por rango de fecha
router.get('/auditorias/fecha', auditoriaController.obtenerAuditorias);
module.exports = router;
