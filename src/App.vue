<script setup>
import SlotDefaultParent from './components/practices/basic/P. 177 code challenge-Component slot/SlotDefaultParent.vue'
import SlotNamedParent from './components/practices/basic/P. 177 code challenge-Component slot/SlotNamedParent.vue'
import SlotScopedParent from './components/practices/basic/P. 177 code challenge-Component slot/SlotScopedParent.vue'
</script>

<template>
  <div style="padding: 20px">
    <SlotDefaultParent />
    <hr />
    <SlotNamedParent />
    <hr />
    <SlotScopedParent />
  </div>
</template>
