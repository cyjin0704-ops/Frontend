<script setup>
import UserFormValidation from './components/practices/basic/P. 246 code challenge-UI Library/UserFormValidation.vue'
import ProductQuantityRating from './components/practices/basic/P. 246 code challenge-UI Library/ProductQuantityRating.vue'
import SystemFeedbackProgress from './components/practices/basic/P. 246 code challenge-UI Library/SystemFeedbackProgress.vue'
</script>

<template>
  <main class="ui-library-practice">
    <UserFormValidation />
    <ProductQuantityRating />
    <SystemFeedbackProgress />
  </main>
</template>

<style scoped>
.ui-library-practice {
  width: min(700px, calc(100% - 32px));
  margin: 30px auto;
}
</style>
