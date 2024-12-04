const { getUtmValue } = require('../services/utmService');
const { getReajusteFactor } = require('../services/reajusteService');
const { calcularReajuste, calcularMulta, calcularMesesAtraso } = require('../utils/calculate');
const { guardarAuditoria } = require('../services/auditoriaService');

const calcularReajusteYMulta = async (req, res) => {
  var { monto, tipo, fechaVencimiento, fechaPago } = req.body;

  try {
    const fechaVenc = new Date(fechaVencimiento);
    const fechaPag = new Date(fechaPago);
    console.log('Fecha de vencimiento:', fechaVenc);
    console.log('Fecha de pago:', fechaPag);
    // Calcular los meses de atraso
    const mesesDeAtraso = calcularMesesAtraso(fechaVencimiento, fechaPago);
    var montoEnPesos = null
    // Obtener UTM
    if (tipo === 'UTM') {
      const utm = await getUtmValue(fechaPag)
      console.log('monto', monto);
      console.log('UTM:', utm);
      // Calcular el valor en pesos
      var montoEnPesos = (monto * utm);
      console.log("viene en UTM")

      console.log('Monto en pesos:', montoEnPesos);
    }

    // Obtener el factor de reajuste
    const factorReajuste = await getReajusteFactor(fechaPag.getFullYear(), fechaPag.getMonth() + 1, fechaVenc.getFullYear(), fechaVenc.getMonth() + 1,);
    console.log('Factor de reajuste:', factorReajuste);
    // Calcular el valor reajustado
    if (montoEnPesos != null) {
      monto = montoEnPesos
    }
    console.log('Monto:', monto);
    const montoReajustado = calcularReajuste(monto, factorReajuste);
    console.log('Monto reajustado:', montoReajustado);
    // Calcular la multa
    const dataMulta = calcularMulta(montoReajustado, mesesDeAtraso);
   
    console.log(dataMulta)
    // Resultado final
    const resultado = {
      montoOriginal: monto,
      montoReajustado,
      mesesAtraso: dataMulta.mesesAtraso,
      multa: dataMulta.multa,
      total: dataMulta.montoMasMulta,

    };
    console.log('Resultado:', resultado)

    const auditoria = await guardarAuditoria
      ({
        montoOriginal: monto,
        fechaVencimiento: fechaVenc,
        fechaPago: fechaPag,
        reajuste: montoReajustado,
        multa: dataMulta.multa,
        total: resultado.total,
      })

    console.log('Auditoría guardada:', auditoria);

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error en el cálculo:', error);
    res.status(500).json({ error: 'Hubo un error al realizar los cálculos.' });
  }
};

module.exports = { calcularReajusteYMulta };
