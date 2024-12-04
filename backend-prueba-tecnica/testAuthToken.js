const axios = require('axios');
require('dotenv').config();

const getAuthToken = async () => {
    const auth = Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64');
    try {
        const response = await axios.get(`${process.env.API_REAJUSTE_URL}/token`, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        console.log('Token:', response.data);
        console.log(typeof response.data);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo el token:', error);
        throw new Error('No se pudo obtener el token de autenticación.');
    }
};

const getReajusteFactor = async (anioRegistro, mesRegistro, anioPago, mesPago) => {
    try {
        console.log('verificando que lleguen todas las variables', anioRegistro, mesRegistro, anioPago, mesPago);
        const token = await getAuthToken();
        console.log('URL', `${process.env.API_REAJUSTE_URL}/v1/reajuste/custom?anio_registro=${anioRegistro}&mes_registro=${mesRegistro}&anio_pago=${anioPago}&mes_pago=${mesPago}`);
        
        console.log('Request Details:', {
            url: `${process.env.API_REAJUSTE_URL}/v1/reajuste/custom`,
            params: { anio_registro: anioRegistro, mes_registro: mesRegistro, anio_pago: anioPago, mes_pago: mesPago },
            headers: { Authorization: `Bearer ${token}` }
        });
        
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

const testYearCombinations = async () => {
    const yearCombinations = [
        [2020, 1, 2021, 1],
        [2019, 6, 2022, 6],
        [2015, 12, 2023, 12],
        [2010, 7, 2024, 7],
        [2024, 3, 2003, 3]
    ];

    for (const [anioRegistro, mesRegistro, anioPago, mesPago] of yearCombinations) {
        try {
            console.log(`Testing: ${anioRegistro}-${mesRegistro} to ${anioPago}-${mesPago}`);
            const factor = await getReajusteFactor(anioRegistro, mesRegistro, anioPago, mesPago);
            console.log(`Factor de reajuste: ${factor}`);
            
            if (factor === 0) {
                console.warn(`⚠️ Zero factor for: ${anioRegistro}-${mesRegistro} to ${anioPago}-${mesPago}`);
            }
        } catch (error) {
            console.error(`Error testing ${anioRegistro}-${mesRegistro} to ${anioPago}-${mesPago}:`, error.message);
        }
    }
};

module.exports = { getReajusteFactor, testYearCombinations };

// Uncomment the line below to run the test directly
testYearCombinations();