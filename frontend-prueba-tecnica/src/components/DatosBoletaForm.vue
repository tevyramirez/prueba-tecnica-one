<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-group">
      <label for="monto" class="form-label">Monto:</label>
      <input
        v-model.number="form.monto"
        type="number"
        step="0.01"
        id="monto"
        required
        class="form-input"
        min="0"
      />
      <select v-model="form.tipo" class="form-input">
        <option value="CLP">CLP</option>
        <option value="UTM">UTM</option>
      </select>
    </div>

    <div class="form-group">
      <label for="fechaVencimiento" class="form-label">Fecha de Vencimiento:</label>
      <input
        v-model="form.fechaVencimiento"
        type="date"
        id="fechaVencimiento"
        required
        class="form-input"
      />
    </div>
    <div class="form-group">
      <label for="fechaPago" class="form-label">Fecha De Pago:</label>
      <input
        v-model="form.fechaPago"
        type="date"
        id="paymentDate"
        dateFormat="dd/mm/yyyy"
        required
        class="form-input"
      />
    </div>
    <div v-if="errorMessage" class="error-message">
      ⚠️ {{ errorMessage }}
    </div>
    <button type="submit" class="submit-button">Calcular</button>
  </form>
  <ModalsContainer />

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import ResultadosModal from './ResultadosModal.vue'
import { useModal, ModalsContainer } from 'vue-final-modal'

interface FormData {
  monto: number
  tipo: 'CLP' | 'UTM'
  fechaVencimiento: string
  fechaPago: string
}

const form = ref<FormData>({
  monto: 0,
  tipo: 'CLP',
  fechaVencimiento: '',
  fechaPago: ''
})
const errorMessage = ref<string | null>(null)

const adjustLocaleFormat = (field: 'fechaVencimiento' | 'fechaPago') => {
  const selectedDate = new Date(form.value[field]);
  formattedDates.value[field] = selectedDate.toLocaleDateString('es-CL'); // Chile (dd/mm/yyyy)
};

const handleSubmit = () => {
  const monto = form.value.monto
  const fechaVencimiento = new Date(form.value.fechaVencimiento).getTime()
  const fechaPago = new Date(form.value.fechaPago).getTime()

  // Validaciones para el formulario
  if (monto <= 0) {
    errorMessage.value = 'El monto debe ser mayor a 0.'
    return
  }
  if ((form.value.tipo === 'CLP' && !Number.isInteger(monto)) || !Number.isFinite(monto)) {
    errorMessage.value = 'Ingresa correctamente el monto.'
    return
  }


  if (fechaVencimiento > fechaPago) {
    errorMessage.value = 'La fecha de vencimiento no puede ser mayor a la fecha de pago.'
    return
  }

  errorMessage.value = null

  axios.post('http://localhost:3000/api/reajustes/calcular', form.value)
    .then(response => {
      const modalInstance = useModal({
  component: ResultadosModal,

  attrs: {
    title: 'Resultados del cálculo',
    onConfirm() {
        modalInstance.close()
      },
    data: {
      "Monto": response.data.montoOriginal,
      "Tipo": form.value.tipo,
      "Fecha de Vencimiento": form.value.fechaVencimiento,
      "Fecha de Pago": form.value.fechaPago,
      "Monto con Reajuste": response.data.montoReajustado,
      "Monto de la Multa": response.data.multa,
      "Total": response.data.total
    },
    clickToClose: true,
    escToClose: true
  }

    })
    modalInstance.open()
        }
      )
    .catch(error => {
      console.error('Error al enviar el formulario:', error)
      errorMessage.value = 'Hubo un error al calcular. Por favor, intente nuevamente.'
    })
}
</script>

<style scoped>
.form-container {
  background: var(--color-background-soft);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 1rem;
}

.error-message {
  color: #F44336;
  font-weight: 600;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--color-heading);
}

.form-input {
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background-mute);
  color: var(--color-text);
  font-size: 1rem;
}

.form-input:focus {
  border-color: var(--color-text-active);
  outline: none;
}

.submit-button {
  padding: 1rem;
  background-color: var(--color-text-active);
  color: var(--vt-c-white);
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--color-text);
}

.submit-button:focus {
  outline: none;
}
</style>
