<template>
  <div>
    <header-nav>布局视图</header-nav>
    <div class="flex">
      <side>左侧导航</side>
      <router-view class="flex-grow" />
    </div>
  </div>
</template>
<script setup>
import HeaderNav from './header-nav.vue'
import side from './side/index.vue'
</script>
<style scoped lang="scss"></style>