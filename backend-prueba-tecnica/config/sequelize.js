const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: true, // Cambiar a true si necesitas ver las consultas SQL en desarrollo
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión con Sequelize establecida con éxito.');
  })
  .catch((err) => {
    console.error('No se pudo conectar con Sequelize:', err);
  });

module.exports = sequelize;
