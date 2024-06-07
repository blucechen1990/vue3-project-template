<template>
  <el-config-provider :locale="locale">
    <app />
    <!-- <el-button type="primary" @click="switchLang">语言切换</el-button> -->
    <!-- <el-date-picker type="date" placeholder="Pick a day" /> -->
  </el-config-provider>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import App from './App.vue'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import useLanguage from './store/useLanguage'


export default defineComponent({
  components: {
    ElConfigProvider,
    App
  },
  setup() {
    const langStore = useLanguage()
    const locale = computed(() => langStore.currentLang == 'zh' ? zhCn : en)


    // 语言切换
    const switchLang = () => {
      langStore.switchLang()
    }


    return {
      switchLang,
      locale,
    }
  },
})
</script>