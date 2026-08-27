<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('올바른 이메일 형식이 아닙니다.')
    return
  }

  if (!userForm.value.agree) {
    ElMessage.warning('이용약관에 동의해야 합니다.')
    return
  }

  ElMessage.success('가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <el-card class="practice-card">
    <template #header>📝 실습 1. 회원가입 Form & 입력 제어</template>

    <div class="form-row">
      <label>이메일 주소:</label>
      <el-input v-model="userForm.email" placeholder="example@email.com" />
    </div>

    <div class="agree-row">
      <el-switch v-model="userForm.agree" />
      <span>개인정보 수집 및 필수 이용약관에 동의합니다.</span>
    </div>

    <el-button type="success" class="full-button" @click="handleRegister">
      🚀 회원가입하기
    </el-button>
  </el-card>
</template>

<style scoped>
.practice-card {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
}

.agree-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 14px;
}

.full-button {
  width: 100%;
}
</style>
