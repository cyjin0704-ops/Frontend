<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggle from './components/exercises/UnitToggle.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <h1>🌤️ 종합실습 5: 스토어 적용</h1>
      <UnitToggle />
    </header>

    <nav>
      <RouterLink to="/">날씨 대시보드</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
