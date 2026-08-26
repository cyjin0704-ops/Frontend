<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="about-card">
    <h2>📘 서비스 소개</h2>
    <p>이 서비스는 Vue Router를 사용해 지역별 날씨 정보를 보여주는 예제입니다.</p>
    <ul>
      <li>도시 이름으로 날씨 검색</li>
      <li>도시별 상세 페이지 이동</li>
      <li>동적 라우트와 Lazy Loading 적용</li>
    </ul>
    <button @click="router.back()">이전 화면으로 이동</button>
  </main>
</template>

<style scoped>
.about-card {
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
