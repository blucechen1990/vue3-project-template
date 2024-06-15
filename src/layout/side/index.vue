<template>
  <aside class="flex flex-col px-0">
    <section class="text-right border p-2">
      <el-icon size="22" @click="isCollapse = !isCollapse">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </el-icon>
    </section>

    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
    >
      <menu-item :menus="menus"></menu-item>
    </el-menu>
  </aside>
</template>
<script setup>
import { ref } from 'vue'
import MenuItem from './menu-item.vue'
import { routes } from '@/router/index'
import whiteList from '@/router/white-list'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isCollapse = ref(false)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}

const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const select = (indexStr, keyPath) => {
  router.push(indexStr)
}

const menus = []

const setMenu = (routes) => {
  routes.forEach((route) => {
    if (route.path == '/') {
      menus.push(route.children[0])
    } else if (!whiteList.includes(route.path)) {
      menus.push(route)
    }
  })
}

setMenu(routes)

console.log(menus)
</script>
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  flex-grow: 1;
}
</style>
