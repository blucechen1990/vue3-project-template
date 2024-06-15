<template>
  <div class="bg-white p-[20px] layout-box" ref="layout">
    <div v-if="$slots.search" class="bg-[--gray] p-[20px] pb-[2px]">
      <slot name="search"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'layout-container' })
const layout = ref()
</script>

<style lang="scss" scoped>
.layout-box {
  height: 100%;
  overflow: auto;
}
.auto-height {
  height: auto;
}
</style>
