<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  cityId: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const cityInfo = ref(null)

const mockWeatherList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 45 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 70 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 60 },
  { id: 'city_04', name: '판교', temp: 31, status: '흐림', humidity: 55 },
]

onMounted(() => {
  cityInfo.value = mockWeatherList.find((weather) => weather.id === props.cityId) ?? null
})
</script>

<template>
  <main class="detail-card">
    <template v-if="cityInfo">
      <h2>🌡️ {{ cityInfo.name }} 상세 기상 정보</h2>
      <p>도시 코드: {{ cityInfo.id }}</p>
      <p>현재 기온: {{ cityInfo.temp }}°C</p>
      <p>현재 날씨: {{ cityInfo.status }}</p>
      <p>습도: {{ cityInfo.humidity }}%</p>
    </template>

    <p v-else>해당 도시의 정보를 찾을 수 없습니다.</p>
    <button @click="router.back()">목록으로 돌아가기</button>
  </main>
</template>

<style scoped>
.detail-card {
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
