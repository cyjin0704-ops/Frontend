<script setup>
import SlotScopedChild from './SlotScopedChild.vue'
</script>

<template>
  <div class="practice-section">
    <h2>Scoped Slot 데이터 활용 실습</h2>

    <SlotScopedChild v-slot="slotBag">
      <div class="display-panel">
        <p>원본 메시지: {{ slotBag.text }}</p>
        <p>접속자 수: {{ slotBag.count }}명</p>
      </div>
    </SlotScopedChild>
  </div>
</template>

<style scoped>
.display-panel {
  padding: 10px;
  background-color: #fff4e5;
}
</style>
