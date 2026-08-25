<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const selectedCityInfo = ref(null)

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '판교', temp: 31, status: '흐림' },
])

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (keyword === '') {
    return weatherList.value
  }

  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

const selectCity = (weather) => {
  selectedCityInfo.value = weather
}

watch(selectedCityInfo, (newCity, oldCity) => {
  console.log(
    `[watch 감지] 선택 도시가 '${oldCity?.name ?? '없음'}'에서 '${newCity?.name}'(으)로 변경되었습니다.`,
  )
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어: '${searchQuery.value}'`)
})

// 5번: 직접 추가한 반응형 상태, computed, watcher
const favoriteCity = ref('서울')

const favoriteCityInfo = computed(() => {
  return weatherList.value.find((weather) => weather.name === favoriteCity.value)
})

watch(favoriteCity, (newCity, oldCity) => {
  console.log(`[추가 watcher] 관심 도시가 '${oldCity}'에서 '${newCity}'(으)로 변경되었습니다.`)
})
</script>

<template>
  <div class="container">
    <h1>🌤️ 과제 2: 날씨 (컴포지션)</h1>

    <section>
      <h2>🔍 도시 검색</h2>
      <input v-model="searchQuery" placeholder="도시명을 입력하세요" />
      <p>검색 중인 도시: {{ searchQuery || '전체' }}</p>
    </section>

    <section>
      <h2>🌆 지역별 날씨 현황</h2>

      <div v-if="filteredWeatherList.length === 0" class="empty-message">
        검색 결과와 일치하는 도시가 없습니다.
      </div>

      <div
        v-for="weather in filteredWeatherList"
        :key="weather.id"
        class="weather-card"
      >
        <div>
          <h3>{{ weather.name }}</h3>
          <p>현재 기온: {{ weather.temp }}°C</p>
          <p>날씨: {{ weather.status }}</p>
        </div>

        <button @click="selectCity(weather)">선택하기</button>
      </div>
    </section>

    <p v-if="selectedCityInfo" class="guide">
      {{ selectedCityInfo.name }}이(가) 선택되었습니다.
    </p>
    <p v-else class="guide">도시를 선택해 주세요.</p>

    <section>
      <h2>⭐ 관심 도시</h2>
      <select v-model="favoriteCity">
        <option v-for="weather in weatherList" :key="weather.id" :value="weather.name">
          {{ weather.name }}
        </option>
      </select>
      <p>
        {{ favoriteCityInfo.name }}의 날씨는 {{ favoriteCityInfo.status }}, 기온은
        {{ favoriteCityInfo.temp }}°C입니다.
      </p>
    </section>
  </div>
</template>
