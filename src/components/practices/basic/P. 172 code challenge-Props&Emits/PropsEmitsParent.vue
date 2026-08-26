<script setup>
import { ref } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

// 1. 상위 컴포넌트에 존재하는 반응형 원본 정의
const message = ref('Parent 초기 메시지')

// 2. 하위 컴포넌트의 커스텀 이벤트를 수신했을 때 실행될 콜백 함수
// 인자 newValue에는 하위 컴포넌트가 보낸 페이로드가 자동으로 전달된다.
const handleUpdateRequest = (newValue) => {
  message.value = newValue
}
</script>

<template>
  <div class="practice-section">
    <h2>Props & Emits</h2>

    <div class="parent-container">
      <h2>상위 컴포넌트 (Parent)</h2>
      <p>
        현재 원본 데이터(state): <strong>{{ message }}</strong>
      </p>
      <br />

      <PropsEmitsChild :parent-data="message" @update-request="handleUpdateRequest" />
    </div>
  </div>
</template>

<style scoped>
.practice-section {
  max-width: 700px;
  padding: 20px;
}

.parent-container {
  padding: 15px;
  border: 1px solid #aaa;
}
</style>
