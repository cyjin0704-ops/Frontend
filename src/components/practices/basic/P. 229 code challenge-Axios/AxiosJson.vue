<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const items = ref([])
const textInput = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleRead = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    console.log('GET 성공:', response.data)
  } catch (error) {
    console.error('GET 실패:', error)
    errorMessage.value = '목록을 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

const handleCreate = async () => {
  const title = textInput.value.trim()
  if (!title) return

  try {
    const response = await axios.post(BASE_URL, {
      title,
      body: 'Axios POST 실습 데이터',
      userId: 1,
    })

    items.value.unshift({ ...response.data, id: Date.now() })
    textInput.value = ''
    console.log('POST 성공:', response.data)
  } catch (error) {
    console.error('POST 실패:', error)
    errorMessage.value = '데이터를 추가하지 못했습니다.'
  }
}

const handleUpdate = async (item) => {
  const changedTitle = `${item.title} (수정됨)`

  try {
    await axios.put(`${BASE_URL}/${item.id}`, {
      ...item,
      title: changedTitle,
    })

    item.title = changedTitle
    console.log('PUT 성공:', item)
  } catch (error) {
    console.error('PUT 실패:', error)
    errorMessage.value = '데이터를 수정하지 못했습니다.'
  }
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    items.value = items.value.filter((item) => item.id !== id)
    console.log('DELETE 성공:', id)
  } catch (error) {
    console.error('DELETE 실패:', error)
    errorMessage.value = '데이터를 삭제하지 못했습니다.'
  }
}

onMounted(handleRead)
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios CRUD 프로토타입 훈련</h2>

    <div class="input-area">
      <input v-model="textInput" placeholder="저장할 텍스트를 입력하세요" />
      <button @click="handleCreate">POST 추가</button>
    </div>

    <p v-if="isLoading">데이터를 불러오는 중입니다.</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div v-for="item in items" :key="item.id" class="item-card">
      <div>
        <small>No. {{ item.id }}</small>
        <p>{{ item.title }}</p>
      </div>
      <div>
        <button class="update-button" @click="handleUpdate(item)">PUT 수정</button>
        <button class="delete-button" @click="handleDelete(item.id)">DELETE 삭제</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.practice-section {
  padding: 15px;
  border: 1px solid #ddd;
}

.input-area,
.item-card {
  display: flex;
  gap: 8px;
}

.input-area input {
  flex: 1;
}

.item-card {
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
}

button {
  margin-left: 4px;
  padding: 6px 9px;
}

.update-button {
  background-color: #ffc928;
}

.delete-button {
  color: white;
  background-color: #ff4d5a;
}

.error-message {
  color: #d33;
}
</style>
