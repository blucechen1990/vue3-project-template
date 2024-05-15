import { ref } from 'vue'
import { defineStore } from 'pinia'

const useUser = defineStore('user', () => {
  const isLogined = ref(false)

  function setLoginStatus(val) {
    isLogined.value  = val
  }

  return { isLogined, setLoginStatus }
}, { 
  persist: true, // 持久化
})

export default useUser
