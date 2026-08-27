<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main class="about-card">
    <h2>📘 서비스 소개</h2>
    <p>Axios로 OpenWeatherMap의 실제 날씨와 예보 데이터를 가져오는 예제입니다.</p>
    <p>상세 화면에서는 Open-Meteo 대기질 API도 함께 사용합니다.</p>
    <button @click="router.back()">이전 화면으로 이동</button>
  </main>
</template>

<style scoped>
.about-card { padding: 20px; border: 1px solid #ddd; }
</style>
