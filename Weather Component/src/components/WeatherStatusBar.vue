<script setup>
defineProps({
  resultCount: {
    type: Number,
    required: true,
  },
  selectedCity: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="status-bar">
    <p v-if="selectedCity">
      선택 도시: {{ selectedCity.name }} / 날씨: {{ selectedCity.status }}
    </p>
    <p v-else>카드를 클릭하거나 검색해 보세요.</p>
    <small>현재 검색 결과: {{ resultCount }}개</small>
  </div>
</template>

<style scoped>
.status-bar {
  padding: 10px;
  text-align: center;
  background-color: #e5f5e8;
}

p {
  margin: 0 0 5px;
}
</style>
