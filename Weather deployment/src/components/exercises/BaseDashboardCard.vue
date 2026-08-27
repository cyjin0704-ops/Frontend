<script setup>
import Card from 'primevue/card'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Card class="dashboard-card">
    <template #title>{{ title }}</template>
    <template #content>
      <slot></slot>
    </template>
  </Card>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 16px;
}
</style>
