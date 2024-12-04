const auditoriaService = require('../services/auditoriaService');

// Crear una nueva auditoría
const crearAuditoria = async (req, res) => {
  try {
    const datos = req.body;
    const auditoria = await auditoriaService.guardarAuditoria(datos);
    res.status(201).json(auditoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la auditoría' });
  }
};

// Obtener auditorías por rango de fecha
const obtenerAuditorias = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    console.log('Fecha inicio:', fechaInicio);
    console.log('Fecha fin:', fechaFin);
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Faltan fechas de inicio o fin' });
    }
    const auditorias = await auditoriaService.obtenerAuditoriasPorFecha(new Date(fechaInicio), new Date(fechaFin));
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las auditorías' });
  }
};

const getAllAuditorias = async (req, res) => {
  try {
    const auditorias = await auditoriaService.getAllAuditorias();
    res.status(200).json(auditorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las auditorías' });
  }
};

module.exports = {
  crearAuditoria,
  obtenerAuditorias,
  getAllAuditorias
};
