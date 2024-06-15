import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import zhMessage from '@/utils/lang/zh'
import enMessage from '@/utils/lang/en'
import '@/assets/main.css'

// 自定义指令
import installDirective from '@/directives/index'

import ConfigProvider from './ConfigProvider.vue'
import router from './router'

const app = createApp(ConfigProvider)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const i18n = createI18n({
  legacy: false,
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 默认语言未配置相关国际化， 使用英文
  messages: {
    en: enMessage,
    zh: zhMessage
  }
})

app.use(pinia)
app.use(router)
app.use(i18n)

installDirective(app)

app.mount('#app')
