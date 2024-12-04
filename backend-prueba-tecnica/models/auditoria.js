const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Asegúrate de apuntar a la conexión Sequelize

const Auditoria = sequelize.define('Auditoria', {
  montoOriginal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaPago: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reajuste: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  multa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'auditoria',
  timestamps: false,
});

module.exports = Auditoria;