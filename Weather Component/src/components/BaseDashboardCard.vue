<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h2>{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
}

h2 {
  font-size: 18px;
}
</style>
