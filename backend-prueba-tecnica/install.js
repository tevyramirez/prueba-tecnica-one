// install.js
const mysql = require('mysql2');
require('dotenv').config(); // Cargar las variables de entorno

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
console.log('Conectando a MySQL...');   
// mostrar datos de conexion para debug
console.log('host: ', process.env.DB_HOST);
console.log('user: ', process.env.DB_USER);
console.log('password: ', process.env.DB_PASSWORD);
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }

  console.log('Conexión a MySQL exitosa.');
  
  // Crear la base de datos si no existe
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) {
      console.error('Error al crear la base de datos: ', err);
      return;
    }
    console.log('Base de datos creada o ya existe.');
    
    // Seleccionar la base de datos creada
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) {
        console.error('Error al seleccionar la base de datos: ', err);
        return;
      }

      // Crear las tablas si no existen
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS auditoria (
          id INT AUTO_INCREMENT PRIMARY KEY,
          montoOriginal DECIMAL(10, 2) NOT NULL,
          fechaVencimiento DATE NOT NULL,
          fechaPago DATE NOT NULL,
          reajuste DECIMAL(10, 2) NOT NULL,
          multa DECIMAL(10, 2) NOT NULL,
          total DECIMAL(10, 2) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error al crear las tablas: ', err);
        } else {
          console.log('Tablas creadas correctamente.');
        }
        connection.end(); // Cerrar la conexión
      });
    });
  });
});
