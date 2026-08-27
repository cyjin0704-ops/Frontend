<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import UnitToggle from './components/exercises/UnitToggle.vue'
</script>

<template>
  <Toast />

  <div class="app-container">
    <header>
      <div>
        <h1>🌤️ 종합실습 7: PrimeVue 적용</h1>
        <p class="subtitle">실제 날씨 API와 외부 UI Library 활용</p>
      </div>
      <UnitToggle />
    </header>

    <nav>
      <RouterLink to="/">날씨 대시보드</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
