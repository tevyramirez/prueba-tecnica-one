const Auditoria = require('../models/auditoria');
const { Op } = require('sequelize');
const moment = require('moment'); 

// Guardar una nueva auditoría
const guardarAuditoria = async (datos) => {
  try {
    const auditoria = await Auditoria.create(datos);
    return auditoria;
  } catch (error) {
    console.error('Error guardando la auditoría:', error);
    throw error;
  }
};

// Obtener todas las auditorías
const getAllAuditorias = async () => {
  try {
    console.log("Intentando obtener todas las auditorías...");
    const auditorias = await Auditoria.findAll();
    console.log("Auditorías obtenidas:", auditorias);
    return auditorias;
  } catch (error) {
    console.error('Error obteniendo todas las auditorías:', error);
    throw error;
  }
};

// Obtener auditorías por rango de fecha
const obtenerAuditoriasPorFecha = async (fechaInicio, fechaFin) => {
  try {
    //formatear Fecha
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin); 
    const auditorias = await Auditoria.findAll({
      where: {
        createdAt: {
          [Op.between]: [fechaInicio, fechaFin]
        }
      }
    });
    console.log('Auditorías obtenidas por fecha:', auditorias)
    return auditorias;
  } catch (error) {
    console.error('Error obteniendo auditorías por fecha:', error);
    throw error;
  }
};

module.exports = {
  guardarAuditoria,
  getAllAuditorias,
  obtenerAuditoriasPorFecha
};