const sequelize = require('./config/sequelize'); // Ajusta el path según tu estructura
const Auditoria = require('./models/auditoria'); // Ajusta el path

(async () => {
  try {
    await sequelize.sync({ force: true }); // `force: true` elimina y recrea la tabla (útil para desarrollo)
    console.log('Tabla sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la tabla:', error);
  } finally {
    await sequelize.close();
  }
})();
