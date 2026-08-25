<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 31, status: '흐림' },
])

const cityInput = ref('')

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 ${status} 상태입니다.`)
}
</script>

<template>
  <div class="container">
    <h1>🌤️ 과제 1: 날씨 (Mockup)</h1>

    <section>
      <h2>🔍 도시 검색</h2>
      <input v-model="cityInput" placeholder="도시명을 입력하세요" />
      <p>입력 중인 도시: {{ cityInput }}</p>
    </section>

    <section>
      <h2>🌆 지역별 날씨 현황</h2>

      <div v-for="weather in weatherList" :key="weather.id" class="weather-card">
        <div>
          <h3>{{ weather.name }}</h3>
          <p>현재 기온: {{ weather.temp }}°C</p>

          <span v-if="weather.temp >= 25" class="hot">🔥 더움 (25도 이상)</span>
          <span v-else class="cool">❄️ 선선함 (25도 미만)</span>
        </div>

        <button @click="showDetail(weather.name, weather.status)">상세보기</button>
      </div>
    </section>

    <p class="guide">카드를 클릭하거나 검색해 보세요.</p>
  </div>
</template>
