const express = require('express');
const app = express();
const cors = require('cors');
const swaggerStats = require('swagger-stats');

app.use(express.json());
app.use(cors());

// Definición de la especificación de tus endpoints
const apiSpec = {
  info: {
    title: 'Reajustes API',
    version: '1.0.0',
    description: 'API para manejo de reajustes y auditorías'
  },
  paths: {
    '/api/reajustes/calcular': {
      
      post: {
        summary: 'Se calcula el reajuste y multa',
        description: 'Calcula el reajuste y multa de un monto',
      }
    },
    '/api/audit/auditoria': {
      post: {
        summary: 'Crear auditoría',
        description: 'Crea un nuevo registro de auditoría'
      }
    },
    '/api/audit/auditorias': {
      get: {
        summary: 'Obtener todas las auditorías',
        description: 'Recupera todos los registros de auditoría'
      }
    },
    '/api/audit/auditorias/fecha': {
      get: {
        summary: 'Obtener auditorías por rango de fecha',
        description: 'Recupera registros de auditoría dentro de un rango de fechas específico'
      }
  }}
};

// Middleware de swagger-stats con especificación detallada
app.use(swaggerStats.getMiddleware({
  swaggerSpec: apiSpec,
  uiPath: '/api-metrics',
  authentication: false
}));

// Tus rutas
const reajusteRoutes = require('./routes/reajusteRoutes');
const auditRoutes = require('./routes/auditRoutes');
app.use('/api/reajustes', reajusteRoutes);
app.use('/api/audit', auditRoutes);

module.exports = app;