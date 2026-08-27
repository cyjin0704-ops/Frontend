<script setup>
import Button from 'primevue/button'
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggle">
    <span>날씨 단위: {{ configStore.unitSymbol }}</span>
    <Button
      :label="configStore.unit === 'celsius' ? '화씨로 변경' : '섭씨로 변경'"
      size="small"
      severity="secondary"
      @click="configStore.toggleUnit"
    />
    <small>{{ configStore.toggleMessage }}</small>
  </div>
</template>

<style scoped>
.unit-toggle {
  display: grid;
  gap: 5px;
  justify-items: end;
}

small {
  color: #666;
}
</style>
