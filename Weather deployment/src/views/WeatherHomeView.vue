<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import BaseDashboardCard from '../components/exercises/BaseDashboardCard.vue'
import SearchBar from '../components/exercises/SearchBar.vue'
import WeatherCard from '../components/exercises/WeatherCard.vue'
import { fetchCurrentWeatherByCity } from '../services/weatherApi.js'

const router = useRouter()
const toast = useToast()
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
    toast.add({
      severity: 'error',
      summary: '날씨 조회 실패',
      detail: errorMessage.value,
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

const handleUpdateQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleSearch = (newQuery) => {
  const keyword = newQuery.trim()
  if (keyword !== '' && !weatherList.value.some((weather) => weather.name.includes(keyword))) {
    toast.add({
      severity: 'warn',
      summary: '검색 결과 없음',
      detail: '서울, 수원, 부산, 인천 중에서 검색해 주세요.',
      life: 3000,
    })
  }
}

const goToDetail = (cityId) => {
  router.push({ name: 'weather-detail', params: { cityId } })
}

onMounted(loadWeatherList)
</script>

<template>
  <main>
    <BaseDashboardCard title="🔍 도시 검색">
      <SearchBar
        :search-query="searchQuery"
        @update-query="handleUpdateQuery"
        @search="handleSearch"
      />
    </BaseDashboardCard>

    <BaseDashboardCard title="🌆 지역별 실시간 날씨">
      <Button
        label="날씨 새로고침"
        :loading="isLoading"
        class="refresh-button"
        @click="loadWeatherList"
      />

      <Message v-if="errorMessage" severity="error" :closable="false">
        {{ errorMessage }}
      </Message>

      <div v-else-if="isLoading" class="loading-area">
        <ProgressSpinner />
        <p>OpenWeatherMap에서 날씨를 가져오고 있습니다.</p>
      </div>

      <template v-else>
        <WeatherCard
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          @click-detail="goToDetail"
        />
        <Message v-if="filteredWeatherList.length === 0" severity="warn" :closable="false">
          검색 결과가 없습니다.
        </Message>
      </template>
    </BaseDashboardCard>

    <Message severity="success" :closable="false">
      PrimeVue 컴포넌트로 구성한 실제 날씨 화면입니다.
    </Message>
  </main>
</template>

<style scoped>
.refresh-button {
  margin-bottom: 14px;
}

.loading-area {
  padding: 20px;
  text-align: center;
}
</style>
