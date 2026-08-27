<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'
import { useConfigStore } from '../stores/configStore.js'
import { fetchAirQuality, fetchCurrentWeatherById, fetchForecastById } from '../services/weatherApi.js'

const props = defineProps({
  cityId: { type: String, required: true },
})

const router = useRouter()
const toast = useToast()
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

const airQualitySeverity = computed(() => {
  if (airQuality.value === null) return 'secondary'
  if (airQuality.value <= 50) return 'success'
  if (airQuality.value <= 100) return 'warn'
  return 'danger'
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
    toast.add({
      severity: 'error',
      summary: '상세 날씨 조회 실패',
      detail: errorMessage.value,
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

watch(() => props.cityId, loadWeatherDetail, { immediate: true })
</script>

<template>
  <main>
    <div v-if="isLoading" class="loading-area">
      <ProgressSpinner />
      <p>상세 날씨를 불러오는 중입니다.</p>
    </div>

    <Message v-else-if="errorMessage" severity="error" :closable="false">
      {{ errorMessage }}
    </Message>

    <Card v-else-if="cityInfo">
      <template #title>🌡️ {{ cityInfo.name }} 상세 기상 정보</template>
      <template #content>
        <p>도시 코드: {{ cityInfo.id }}</p>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p>현재 날씨: {{ cityInfo.status }}</p>
        <p>습도: {{ cityInfo.humidity }}%</p>

        <h3>📅 OpenWeatherMap 5일 예보</h3>
        <ul>
          <li v-for="forecast in forecastList" :key="forecast.date">
            {{ forecast.date }}:
            {{ convertTemp(forecast.temp) }}{{ configStore.unitSymbol }},
            {{ forecast.status }}
          </li>
        </ul>

        <h3>🌿 Open-Meteo 대기질</h3>
        <Tag
          :value="`미국 AQI ${airQuality ?? '정보 없음'} · ${airQualityText}`"
          :severity="airQualitySeverity"
        />
      </template>

      <template #footer>
        <Button label="목록으로 돌아가기" severity="secondary" @click="router.back()" />
      </template>
    </Card>
  </main>
</template>

<style scoped>
.loading-area {
  padding: 30px;
  text-align: center;
}
</style>
