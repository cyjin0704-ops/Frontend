<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
</script>

<template>
  <Card>
    <template #title>📘 서비스 소개</template>
    <template #content>
      <p>Axios로 OpenWeatherMap의 실제 날씨와 예보 데이터를 가져옵니다.</p>
      <p>Open-Meteo 대기질 API와 PrimeVue UI Library를 함께 사용합니다.</p>
    </template>
    <template #footer>
      <Button label="이전 화면으로 이동" severity="secondary" @click="router.back()" />
    </template>
  </Card>
</template>
