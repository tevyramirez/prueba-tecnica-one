const axios = require('axios');

const getUtmValue = async (date) => {
  try {
    // Formatear a dd-mm-yyyy
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`; 
    const response = await axios.get(`${process.env.API_UTM_URL}${formattedDate}`);
    console.log('UTM:', response.data.serie[0].valor);
    //hacer Json
    return response.data.serie[0].valor;
  } catch (error) {
    console.error('Error obteniendo la UTM:', error);
    throw new Error('No se pudo obtener la UTM.');
  }
};

module.exports = { getUtmValue };
