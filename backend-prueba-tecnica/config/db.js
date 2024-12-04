const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ', err);
  } else {
    console.log('Conexión a la base de datos establecida con éxito.');
  }
});

module.exports = connection;
