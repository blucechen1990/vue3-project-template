import { createRouter, createWebHistory } from 'vue-router'
import notFoundRoute from './not-found'
import Layout from '@/layout/index.vue'
import Demo01 from '@/views/Demo/child-01.vue'
import Demo02 from '@/views/Demo/child-02.vue'
import Login from '@/views/Demo/login.vue'
import useUser from '@/store/useUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [ // 子路由
        {
          path: '/demo1',
          component: Demo01,
        },
        {
          path: '/demo2',
          component: Demo02,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    notFoundRoute, // 404
  ]
})

router.beforeEach((to, from) => {
  // 登录守卫
  /* const userStore = useUser()
  if (userStore.isLogined) {
    if (to.path == '/login') {
      return { name: 'home' }
    }
  } else {
    if (to.path != '/login') {
      return { name: 'login' }
    }
  } */
})

export default router
