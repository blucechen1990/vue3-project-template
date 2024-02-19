import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 全部引入， 按需引入不需要这些
// import '~/assets/theme/index.scss'
// import 'element-plus/theme-chalk/src/index.scss'
// 全部引入， 按需引入不需要这个
// import ElementPlus from 'element-plus'
// app.use(ElementPlus)

// 自定义
import installDirective from '@/directives/index'
import registerGlobalComponent from '@/components/registerGlobalComponent'



import ConfigProvider from './ConfigProvider.vue'
import router from './router'

const app = createApp(ConfigProvider)

app.use(createPinia())
app.use(router)

installDirective(app)
registerGlobalComponent(app)


app.mount('#app')

