import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const toggleCount = ref(0)

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '°C' : '°F'))
  const toggleMessage = computed(() => `단위 변경 횟수: ${toggleCount.value}회`)

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
    toggleCount.value++
  }

  return { unit, toggleCount, unitSymbol, toggleMessage, toggleUnit }
})
