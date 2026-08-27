<script setup>
// 1. 정의한 카운터 스토어 import
import { useCounterStore } from '@/stores/counter.js'

// 2. 스토어 인스턴스 사용
const counterStore = useCounterStore()
</script>

<template>
  <div class="practice-section">
    <h2>Counter Store 활용 실습</h2>

    <p>
      원본 카운트 데이터(state): <strong>{{ counterStore.count }}</strong>
    </p>
    <p>
      2배 연산 데이터(getters): <span>{{ counterStore.doubleCount }}</span>
    </p>

    <button @click="counterStore.increment">숫자 1 증가 (actions)</button>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 700px;
  padding: 20px;
  border: 1px solid #ddd;
}

button {
  padding: 7px 10px;
}
</style>
