const aproximarCLP = (monto) => {
  return Math.round(monto);
};


const calcularReajuste = (monto, factorReajuste) => {
  console.log('monto', monto);
  console.log('factorReajuste', factorReajuste);
  const reajustado = monto * (1 + (factorReajuste / 100));
  const reajuste = monto * ((1+factorReajuste)/100);
  console.log('reajuste', reajuste);
  return aproximarCLP(reajustado);
};

const calcularMulta = (monto, mesesAtraso) => {
  const multa = monto * (1 + ((1.5 * mesesAtraso) / 100));
  const multaSola = multa - monto
 

  const dataMulta = {
    montoMasMulta: aproximarCLP(multa),
    mesesAtraso: mesesAtraso,
    multa: aproximarCLP(multaSola)
  }
  return dataMulta; 
};

const calcularMesesAtraso = (fechaVencimiento, fechaPago) => {
  const vencimiento = new Date(fechaVencimiento);
  const pago = new Date(fechaPago);

  let mesesDeAtraso = 0;
  while (
    vencimiento.getFullYear() < pago.getFullYear() ||
    (vencimiento.getFullYear() === pago.getFullYear() && vencimiento.getMonth() < pago.getMonth())
  ) {
    mesesDeAtraso++;
    vencimiento.setMonth(vencimiento.getMonth() + 1);
  }
  return mesesDeAtraso;
};

module.exports = { calcularReajuste, calcularMulta, calcularMesesAtraso };
