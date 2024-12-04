<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'


defineProps<{
  title?: string
  data?: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl w-full mx-4 p-6 bg-white dark:bg-gray-800 rounded-lg space-y-4 shadow-lg"
  >
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
      {{ title || 'Datos Devueltos' }}
    </h1>

    <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-auto">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div v-for="(value, key) in data" :key="key" class="flex flex-col">
          <span class="font-medium text-gray-600 dark:text-gray-400">{{ key }}:</span>
          <span class="text-gray-800 dark:text-gray-200">{{ value }}</span>
        </div>
      </div>
    </div>
    <button
      class="self-end mt-4 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition duration-200 flex items-center space-x-2"
      @click="emit('confirm')"
    >

      <span>Confirmar</span>
    </button>
  </VueFinalModal>
</template>
