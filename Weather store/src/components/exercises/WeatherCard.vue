<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click-detail'])
const configStore = useConfigStore()

const displayTemp = computed(() => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((props.weather.temp * 9) / 5 + 32)
  }

  return props.weather.temp
})
</script>

<template>
  <div class="weather-card">
    <div>
      <h3>{{ weather.name }} ({{ weather.status }})</h3>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <span v-if="weather.temp >= 25" class="hot">🔥 더움</span>
      <span v-else class="cool">❄️ 선선함</span>
    </div>

    <button @click="emit('click-detail', weather.id)">상세보기</button>
  </div>
</template>

<style scoped>
.weather-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
}

h3,
p {
  margin: 0 0 8px;
}

span {
  padding: 4px 6px;
  color: white;
}

.hot {
  background-color: #ff5b62;
}

.cool {
  background-color: #4b9fea;
}
</style>
