<template>
  <div class="container items-center mx-auto p-5">
    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-4">
      <div class="flex flex-wrap gap-2 w-full md:w-auto">
        <label>Desde</label>
        <input
          type="date"
          id="startDate"
          v-model="startDate"
          class="flex-grow md:flex-grow-0 border rounded px-2 py-1"
        />
        <label>Hasta</label>
        <input
          type="date"
          v-model="endDate"
          class="flex-grow md:flex-grow-0 border rounded px-2 py-1"
        />
        <button
          @click="fitrarPorFechaAuditorias
        "
          class="w-full md:w-auto bg-blue-500 text-white px-4 py-1 rounded"
        >
          Filtrar
        </button>
      </div>

      <div class="flex items-center space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span class="whitespace-nowrap">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 text-left">Monto Original</th>
            <th class="p-2 text-left">Fecha Vencimiento</th>
            <th class="p-2 text-left">Fecha Pago</th>
            <th class="p-2 text-left">Reajuste</th>
            <th class="p-2 text-left">Multa</th>
            <th class="p-2 text-left">Total</th>
            <th class="p-2 text-left">Fecha Creación</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedData"
            :key="item.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="p-2">{{ formatPeso(item.montoOriginal) }}</td>
            <td class="p-2">{{ formatFecha(item.fechaVencimiento) }}</td>
            <td class="p-2">{{ formatFecha(item.fechaPago) }}</td>
            <td class="p-2">{{ formatPeso(item.reajuste) }}</td>
            <td class="p-2">{{ formatPeso(item.multa) }}</td>
            <td class="p-2">{{ formatPeso(item.total) }}</td>
            <td class="p-2">{{ formatFecha(item.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="text-center py-4">Cargando...</div>
    <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>
    <div v-if="empty" class="text-center py-4">No hay datos para mostrar</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface TableData {
  id: number
  montoOriginal: number
  fechaVencimiento: string
  fechaPago: string
  reajuste: number
  multa: number
  total: number
  createdAt: string
}

const tableData = ref<TableData[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const empty = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const startDate = ref('')
const endDate = ref('')


const formatPeso = (amount: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(amount)
}
const formatFecha = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
}

const fetchTodasAuditorias = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get<TableData[]>('http://localhost:3000/api/audit/auditorias')
  tableData.value = response.data.reverse()
  if (tableData.value.length === 0) {
    empty.value = true}
  } catch (e: any) {
    error.value = "Ups! algo salió mal, en terminos tecnicos parece que fue : " + e.message
  } finally {
    loading.value = false
  }
}

const fitrarPorFechaAuditorias = async () => {
  if (!startDate.value || !endDate.value) {
    error.value = 'Debe seleccionar ambas fechas'
    return
  }

  loading.value = true
  error.value = null
  try {
    const response = await axios.get<TableData[]>('http://localhost:3000/api/audit/auditorias/fecha', {
      params: {
        fechaInicio: startDate.value,
        fechaFin: endDate.value
      }
    })
    tableData.value = response.data
    currentPage.value = 1
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodasAuditorias)

const totalPages = computed(() =>
  Math.ceil(tableData.value.length / itemsPerPage.value)
)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return tableData.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
.container{
  max-width: none;
  width: auto;

  padding: 10px;

}

.table-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

@media screen and (min-width: 1000px) {
  .table-container {
    padding: 20px;
  }
  .container {
    width: auto;
  }
  table {
  width: 100%;
  min-width: 1200px;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

}
table {
  width: 100%;

  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}


th, td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
  font-size:small
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #e8e8e8;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.sort-icon {
  margin-left: 5px;
  font-size: 0.8em;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
