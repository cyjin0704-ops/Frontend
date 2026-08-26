<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'

const count = ref(0)
let timerId = null

// 생성 단계: 데이터와 함수를 준비하지만 아직 DOM에는 접근할 수 없다.
console.log('1. [setup] 컴포넌트가 만들어질 준비되었습니다. (DOM 접근 불가능)')

// 부착 단계: 컴포넌트가 화면에 나타난 뒤 실행된다.
onMounted(() => {
  console.log('2. [onMounted] 화면에 완벽히 부착되었습니다! (API 호출/DOM 조작 적기)')

  timerId = setInterval(() => {
    count.value++
  }, 3000)
})

// 갱신 단계: 반응형 데이터가 바뀌어 화면이 다시 그려질 때 실행된다.
onUpdated(() => {
  console.log(`3. [onUpdated] 데이터가 변경되어 화면을 새로 그렸습니다. (현재 count: ${count.value})`)
})

// 소멸 단계: 컴포넌트가 사라지기 전에 타이머를 정리한다.
onUnmounted(() => {
  clearInterval(timerId)
  console.log('4. [onUnmounted] 컴포넌트가 소멸했습니다. 타이머 취소 완료!')
})
</script>

<template>
  <div class="practice-section">
    <h2>Lifecycle Hook</h2>
    <p>🔴 자동 업데이트 카운터가 3초마다 증가합니다.</p>

    <hr />

    <h3>🔍 라이프사이클 훅 동작 확인</h3>
    <div class="monitor">
      <p>실시간 데이터 카운트: {{ count }}</p>
      <small>브라우저 Console에서 실행 순서를 확인해 보세요.</small>
    </div>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 700px;
  padding: 20px;
}

.monitor {
  padding: 15px;
  text-align: center;
  background-color: #dff7fb;
}
</style>
