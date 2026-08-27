<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  if (!apiKey) {
    errorMessage.value = '.env 파일에 OpenWeather API 키를 입력해 주세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        id: 1835848,
        appid: apiKey,
        units: 'metric',
        lang: 'kr',
      },
    })

    console.log('웨더 API 현재 날씨 데이터(JSON):', response.data)
    weatherData.value = response.data
  } catch (error) {
    console.error('통신 중 에러가 발생했습니다.', error)
    errorMessage.value = '데이터를 가져오지 못했습니다. API 키를 확인해 주세요.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios 통신 검증</h2>

    <button :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 가져오기' }}
    </button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div v-if="weatherData" class="result-card">
      <p>📍 위치: <strong>{{ weatherData.name }}</strong></p>
      <p>🌡️ 현재 기온: <strong>{{ weatherData.main.temp }}°C</strong></p>
      <p>☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong></p>
      <p>💧 습도: <strong>{{ weatherData.main.humidity }}%</strong></p>
    </div>

    <p v-else-if="!errorMessage">아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.</p>
  </div>
</template>

<style scoped>
.practice-section,
.result-card {
  padding: 15px;
  border: 1px solid #ddd;
}

.result-card {
  margin-top: 15px;
  background-color: #eef8ff;
}

.error-message {
  color: #d33;
}
</style>
