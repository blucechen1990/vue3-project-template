import { defineStore } from  'pinia'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineStore('language', () => {
    const router = useRouter()
    const currentLang = ref('zh')
    const {locale} = useI18n()

    const switchLang = () => {
        locale.value = currentLang.value = currentLang.value == 'zh' ? 'en' : 'zh'
        // 切换语言刷新页面， 否则配置在js中的数据不会被重载
        router.go(0)
    }

    onMounted(() => {
        locale.value = currentLang.value
    })
    

    return {
        currentLang,
        switchLang,
    }
}, { 
    persist: true, // 持久化
})