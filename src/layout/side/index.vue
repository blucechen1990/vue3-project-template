<template>
    <aside class="px-0">
        <el-icon size="22" @click="isCollapse = !isCollapse">
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
        <el-menu  class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose">
            <menu-item :menus="menus"></menu-item>
        </el-menu>
    </aside>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import MenuItem from './menu-item.vue';
import { routes } from '@/router/index'
import whiteList from '@/router/white-list'
import { Fold, Expand } from '@element-plus/icons-vue'

const isCollapse = ref(false)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key ,keyPath) => {
  console.log(key, keyPath)
}
const menus = []

const setMenu = (routes) => {
  routes.forEach(route => {
    if(route.path == '/') {
      menus.push(route.children[0])
    } else if(!whiteList.includes(route.path)){
      menus.push(route)
    }
  })
}

setMenu(routes)

</script>
<style scoped lang="scss">

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

</style>