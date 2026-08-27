<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore.js'
import { fetchAirQuality, fetchCurrentWeatherById, fetchForecastById } from '../services/weatherApi.js'

const props = defineProps({
  cityId: { type: String, required: true },
})
const router = useRouter()
const configStore = useConfigStore()
const cityInfo = ref(null)
const forecastList = ref([])
const airQuality = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const convertTemp = (temp) =>
  configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp
const displayTemp = computed(() => (cityInfo.value ? convertTemp(cityInfo.value.temp) : 0))
const airQualityText = computed(() => {
  if (airQuality.value === null) return '정보 없음'
  if (airQuality.value <= 50) return '좋음'
  if (airQuality.value <= 100) return '보통'
  return '나쁨'
})

const loadWeatherDetail = async () => {
  isLoading.value = true
  errorMessage.value = ''
  cityInfo.value = null
  forecastList.value = []
  airQuality.value = null
  try {
    const [currentWeather, forecast] = await Promise.all([
      fetchCurrentWeatherById(props.cityId),
      fetchForecastById(props.cityId),
    ])
    cityInfo.value = currentWeather
    forecastList.value = forecast
    try {
      airQuality.value = await fetchAirQuality(currentWeather.lat, currentWeather.lon)
    } catch (error) {
      console.error('대기질 요청 실패:', error)
    }
  } catch (error) {
    console.error('날씨 상세 요청 실패:', error)
    errorMessage.value = error.message || '상세 날씨를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}
watch(() => props.cityId, loadWeatherDetail, { immediate: true })
</script>

<template>
  <main class="detail-card">
    <p v-if="isLoading">상세 날씨를 불러오는 중입니다.</p>
    <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
    <template v-else-if="cityInfo">
      <h2>🌡️ {{ cityInfo.name }} 상세 기상 정보</h2>
      <p>도시 코드: {{ cityInfo.id }}</p>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>현재 날씨: {{ cityInfo.status }}</p>
      <p>습도: {{ cityInfo.humidity }}%</p>

      <h3>📅 OpenWeatherMap 5일 예보</h3>
      <ul>
        <li v-for="forecast in forecastList" :key="forecast.date">
          {{ forecast.date }}: {{ convertTemp(forecast.temp) }}{{ configStore.unitSymbol }},
          {{ forecast.status }}
        </li>
      </ul>

      <h3>🌿 Open-Meteo 대기질</h3>
      <p>미국 AQI: {{ airQuality ?? '정보 없음' }} ({{ airQualityText }})</p>
    </template>
    <button @click="router.back()">목록으로 돌아가기</button>
  </main>
</template>

<style scoped>
.detail-card { padding: 20px; border: 1px solid #ddd; }
.error { color: #d33; }
</style>
