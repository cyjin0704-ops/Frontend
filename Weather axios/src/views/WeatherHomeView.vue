<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercises/BaseDashboardCard.vue'
import SearchBar from '../components/exercises/SearchBar.vue'
import WeatherCard from '../components/exercises/WeatherCard.vue'
import { fetchCurrentWeatherByCity } from '../services/weatherApi.js'

const router = useRouter()
const cityTargets = [
  { query: 'Seoul,KR', name: '서울' },
  { query: 'Suwon,KR', name: '수원' },
  { query: 'Busan,KR', name: '부산' },
  { query: 'Incheon,KR', name: '인천' },
]
const weatherList = ref([])
const searchQuery = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  if (keyword === '') return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const loadWeatherList = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    weatherList.value = await Promise.all(
      cityTargets.map((city) => fetchCurrentWeatherByCity(city.query, city.name)),
    )
  } catch (error) {
    console.error('날씨 목록 요청 실패:', error)
    errorMessage.value = error.message || '날씨 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}
const goToDetail = (cityId) => {
  router.push({ name: 'weather-detail', params: { cityId } })
}
onMounted(loadWeatherList)
</script>

<template>
  <main>
    <BaseDashboardCard title="🔍 도시 검색 (실제 API 데이터)">
      <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>
    <BaseDashboardCard title="🌆 지역별 실시간 날씨">
      <button :disabled="isLoading" @click="loadWeatherList">
        {{ isLoading ? '불러오는 중...' : '날씨 새로고침' }}
      </button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-else-if="isLoading">OpenWeatherMap에서 날씨를 가져오고 있습니다.</p>
      <template v-else>
        <WeatherCard
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          @click-detail="goToDetail"
        />
        <p v-if="filteredWeatherList.length === 0">검색 결과가 없습니다.</p>
      </template>
    </BaseDashboardCard>
    <p class="guide">OpenWeatherMap의 실제 날씨 데이터입니다.</p>
  </main>
</template>

<style scoped>
button { margin-bottom: 12px; }
.guide { padding: 10px; text-align: center; background-color: #e5f5e8; }
.error { color: #d33; }
</style>
