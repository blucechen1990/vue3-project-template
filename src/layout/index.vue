<template>
  <div class="h-full flex flex-col">
    <header-nav>布局视图</header-nav>
    <div class="flex flex-grow">
      <side>左侧导航</side>
      <div class="p-2">
        <router-view class="flex-grow" />
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderNav from './header-nav.vue'
import side from './side/index.vue'
</script>
<style scoped lang="scss"></style>
