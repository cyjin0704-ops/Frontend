<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
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

const temperatureLabel = computed(() => (props.weather.temp >= 25 ? '🔥 더움' : '❄️ 선선함'))
const temperatureSeverity = computed(() => (props.weather.temp >= 25 ? 'danger' : 'info'))
</script>

<template>
  <Card class="weather-card">
    <template #title>{{ weather.name }}</template>
    <template #subtitle>{{ weather.status }}</template>

    <template #content>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <Tag :value="temperatureLabel" :severity="temperatureSeverity" />
    </template>

    <template #footer>
      <Button label="상세보기" outlined @click="emit('click-detail', weather.id)" />
    </template>
  </Card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 12px;
}

p {
  margin-top: 0;
}
</style>
