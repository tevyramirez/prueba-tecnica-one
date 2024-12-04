const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// Rutas
const reajusteRoutes = require('./routes/reajusteRoutes');
const auditRoutes = require('./routes/auditRoutes');

app.use('/api/reajustes', reajusteRoutes);
app.use('/api/audit', auditRoutes);

module.exports = app;
