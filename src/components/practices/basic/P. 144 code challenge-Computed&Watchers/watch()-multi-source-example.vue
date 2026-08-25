<script setup>
import { ref, watch } from 'vue'

const city = ref('서울')
const dateType = ref('오늘')
const apiStatus = ref('대기 중...')

// 두 개의 ref 변수를 배열로 묶어서 동시에 감시합니다.
watch([city, dateType], ([newCity, newDate], [oldCity, oldDate]) => {
  apiStatus.value = `환경 감지! ${oldCity}/${oldDate} ➡️ ${newCity}/${newDate}`
  // 실무 활용: 두 옵션 중 하나만 바뀌어도 날씨 API 요청을 보냅니다.
  console.log(`날짜 API 요청: ${newCity}의 ${newDate} 날씨를 불러옵니다.`)
})
</script>

<template>
  <div class="practice-section">
    <h2>여러 개의 변수 동시 감시 (watch)</h2>
    <h3>날씨 조건 설정</h3>

    <label>도시: </label>
    <select v-model="city">
      <option value="서울">서울</option>
      <option value="수원">수원</option>
      <option value="부산">부산</option>
    </select>
    &nbsp;

    <label>날짜: </label>
    <label><input v-model="dateType" type="radio" value="오늘" /> 오늘</label>
    &nbsp;
    <label><input v-model="dateType" type="radio" value="내일" /> 내일</label>
    &nbsp;
    <label><input v-model="dateType" type="radio" value="모레" /> 모레</label>

    <div class="monitor">
      <h3>통합 모니터링 로그</h3>
      <p>{{ apiStatus }}</p>
    </div>
  </div>
</template>
