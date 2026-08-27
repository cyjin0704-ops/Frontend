<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <el-card class="practice-card">
    <template #header>🛒 실습 2. 커머스 상품 수량 및 평점 시스템</template>

    <div class="control-row">
      <strong>구매 수량 선택:</strong>
      <el-input-number v-model="productQuantity" :min="1" :max="10" />
      <small>(최대 10개 구매 가능)</small>
    </div>

    <div class="control-row">
      <strong>상품 만족도 별점:</strong>
      <el-rate v-model="productRate" />
      <span>{{ productRate }}점</span>
    </div>

    <el-alert
      :closable="false"
      type="info"
      :title="`실시간 장바구니 요약: 선택 수량 ${productQuantity}개 / 내가 준 점수 ${productRate}점`"
    />
  </el-card>
</template>

<style scoped>
.practice-card {
  margin-bottom: 16px;
}

.control-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}
</style>
