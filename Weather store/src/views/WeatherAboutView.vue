<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="about-card">
    <h2>📘 서비스 소개</h2>
    <p>Pinia를 사용해 모든 화면의 날씨 단위를 함께 관리하는 예제입니다.</p>
    <button @click="router.back()">이전 화면으로 이동</button>
  </main>
</template>

<style scoped>
.about-card {
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
