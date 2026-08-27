<script setup>
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query', 'search'])
const inputValue = ref(props.searchQuery)

watch(
  () => props.searchQuery,
  (newQuery) => {
    inputValue.value = newQuery
  },
)

const handleSearch = () => {
  emit('update-query', inputValue.value)
  emit('search', inputValue.value)
}
</script>

<template>
  <div class="search-area">
    <InputText
      v-model="inputValue"
      class="search-input"
      placeholder="검색할 도시를 입력하세요"
      @keyup.enter="handleSearch"
    />
    <Button label="검색" @click="handleSearch" />
  </div>
  <p>검색 중인 도시: {{ searchQuery || '전체' }}</p>
</template>

<style scoped>
.search-area {
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
}

p {
  margin-bottom: 0;
}
</style>
