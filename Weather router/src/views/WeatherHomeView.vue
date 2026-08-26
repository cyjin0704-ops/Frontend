<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercises/BaseDashboardCard.vue'
import SearchBar from '../components/exercises/SearchBar.vue'
import WeatherCard from '../components/exercises/WeatherCard.vue'

const router = useRouter()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 31, status: '흐림' },
])

const searchQuery = ref('')

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

const goToDetail = (cityId) => {
  router.push({ name: 'weather-detail', params: { cityId } })
}
</script>

<template>
  <main>
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="🌆 지역별 날씨 현황">
      <p v-if="filteredWeatherList.length === 0">검색 결과가 없습니다.</p>

      <WeatherCard
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        :weather="weather"
        @click-detail="goToDetail"
      />
    </BaseDashboardCard>

    <p class="guide">카드를 클릭하거나 검색해 보세요.</p>
  </main>
</template>

<style scoped>
.guide {
  padding: 10px;
  text-align: center;
  background-color: #e5f5e8;
}
</style>
