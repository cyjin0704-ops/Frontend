<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="not-found">
    <h2>🌤️❓</h2>
    <h3>페이지를 찾을 수 없습니다.</h3>
    <p>입력한 주소가 올바른지 확인해 주세요.</p>
    <button @click="router.push('/')">날씨 화면으로 이동</button>
  </main>
</template>

<style scoped>
.not-found {
  padding: 40px;
  text-align: center;
  border: 1px solid #ddd;
}
</style>
