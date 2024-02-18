<template>
  <el-config-provider :locale="locale">
    <app />
    <el-button type="primary" @click="switchLang">语言切换 - {{lang}}</el-button>
     <el-date-picker
        type="date"
        placeholder="Pick a day"
      />
  </el-config-provider>
</template>

<script>
  import { defineComponent, ref, provide } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import App from './App.vue'

  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'
  import zhConfig from '@/utils/lang/zh'
  import enConfig from '@/utils/lang/en'



  export default defineComponent({
    components: {
      ElConfigProvider,
      App
    },
    setup() {
      const zhCnStr = 'zh-CN'
      const enStr = 'en'
      const getConfig = (langVal) => {
        let locale;
        let lang;
        let messageConfig;
        if(langVal === zhCnStr) {
          lang = zhCnStr
          locale = zhCn;
          messageConfig = zhConfig;
        } else {
          lang = enStr
          locale = en;
          messageConfig = enConfig;
        }
        return {locale, lang, messageConfig}
      }
      
      const lang = ref(navigator.language)
      const defaultConfig = getConfig(navigator.language)
      const locale = ref(defaultConfig.locale)
      const messageConfig = ref(defaultConfig.messageConfig)

     
      // 语言切换
      const switchLang = () => {
        const Config = getConfig(lang.value === zhCnStr ? enStr : zhCnStr );
        lang.value = Config.lang;
        locale.value = Config.locale;
        messageConfig.value = Config.messageConfig;
      }

      provide('message', messageConfig);
        
      return {
        lang,
        switchLang,
        locale,
      }
    },
  })
</script>