<script setup>
import SlotDefaultChild from './SlotDefaultChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Default Slot 데이터 주입 실습</h2>

    <SlotDefaultChild>
      <p>본문은 콘텐츠를 주입합니다.</p>
    </SlotDefaultChild>

    <SlotDefaultChild>
      <h2 style="color: #e74c3c">🔴 강조 콘텐츠</h2>
      <button>확인</button>
    </SlotDefaultChild>

    <SlotDefaultChild />
  </div>
</template>
