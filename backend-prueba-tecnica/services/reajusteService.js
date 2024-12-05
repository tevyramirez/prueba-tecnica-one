const axios = require('axios');
require('dotenv').config();

const getReajusteFactor = async (anioRegistro, mesRegistro, anioPago, mesPago) => {
  try {
    console.log('verificando que lleguen todas las variables', anioRegistro, mesRegistro, anioPago, mesPago);
    const token = await getAuthToken();
    const response = await axios.get(`${process.env.API_REAJUSTE_URL}/v1/reajuste/custom?anio_registro=${anioRegistro}&mes_registro=${mesRegistro}&anio_pago=${anioPago}&mes_pago=${mesPago}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
    console.log('Factor de reajuste:', response.data);
    return response.data.factor_reajuste;
  } catch (error) {
    console.error('Error obteniendo el factor de reajuste:', error);
    throw new Error('No se pudo obtener el factor de reajuste.');
  }
};

const getAuthToken = async () => {
  const auth = Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64');
  try {
    const response = await axios.get(`${process.env.API_REAJUSTE_URL}/token`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el token:', error);
    throw new Error('No se pudo obtener el token de autenticación.');
  }
};

module.exports = { getReajusteFactor };
