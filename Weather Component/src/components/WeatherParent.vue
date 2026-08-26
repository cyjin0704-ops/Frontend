<script setup>
import { computed, ref } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherStatusBar from './WeatherStatusBar.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 31, status: '흐림' },
])

const searchQuery = ref('')
const selectedCity = ref(null)

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (keyword === '') {
    return weatherList.value
  }

  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleDetail = (weather) => {
  selectedCity.value = weather
  window.alert(`${weather.name}의 현재 날씨는 ${weather.status} 상태입니다.`)
}
</script>

<template>
  <div class="container">
    <h1>🌤️ 과제 3: 날씨 (컴포넌트)</h1>

    <BaseDashboardCard title="🔍 도시 검색 (검색 즉시 동기화)">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="🌆 지역별 날씨 현황">
      <p v-if="filteredWeatherList.length === 0">검색 결과가 없습니다.</p>

      <WeatherCard
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        :weather="weather"
        @click-detail="handleDetail"
      />
    </BaseDashboardCard>

    <WeatherStatusBar
      :result-count="filteredWeatherList.length"
      :selected-city="selectedCity"
    />
  </div>
</template>

<style scoped>
.container {
  width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
}

h1 {
  font-size: 24px;
}
</style>
