<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div>
    <input
      :value="searchQuery"
      placeholder="검색할 도시를 입력하세요"
      @input="emit('update-query', $event.target.value)"
    />
    <p>검색 중인 도시: {{ searchQuery || '전체' }}</p>
  </div>
</template>

<style scoped>
input {
  width: 100%;
}

p {
  margin-bottom: 0;
}
</style>
