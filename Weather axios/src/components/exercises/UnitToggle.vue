<script setup>
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggle">
    <span>날씨 단위: {{ configStore.unitSymbol }}</span>
    <button @click="configStore.toggleUnit">단위변경</button>
    <small>{{ configStore.toggleMessage }}</small>
  </div>
</template>

<style scoped>
.unit-toggle {
  text-align: right;
}

button {
  margin-left: 8px;
}

small {
  display: block;
  margin-top: 4px;
}
</style>
