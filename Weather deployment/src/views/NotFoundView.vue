<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'

const router = useRouter()
</script>

<template>
  <Card class="not-found">
    <template #title>🌤️❓ 페이지를 찾을 수 없습니다.</template>
    <template #content>
      <p>입력한 주소를 다시 확인해 주세요.</p>
    </template>
    <template #footer>
      <Button label="날씨 화면으로 이동" @click="router.push('/')" />
    </template>
  </Card>
</template>

<style scoped>
.not-found {
  text-align: center;
}
</style>
