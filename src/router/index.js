import { createRouter, createWebHistory } from 'vue-router'
import notFoundRoute from './not-found'
import Layout from '@/layout/index.vue'
import Demo01 from '@/views/Demo/child-01.vue'
import Demo02 from '@/views/Demo/child-02.vue'
import Template from '@/views/template/index.vue'
import Login from '@/views/Demo/login.vue'
import Home from '@/views/home/index.vue'
import SwiperDemo from '@/views/Demo/swipper-demo.vue'
import useUser from '@/store/useUser'


export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Layout,
    meta: {
      title: 'Home',
    },
    children: [ // 子路由
      {
        path: '/home',
        component: Home,
        meta: {
          title: 'Home',
        },
      },
    ]
  },
  {
    path: '/template',
    redirect: '/template-content',
    component: Layout,
    meta: {
      title: 'Template',
    },
    children: [
      {
        path: '/template-content',
        component: Template,
        meta: {
          title: 'Template content',
        },
      }
    ]
  },
  {
    path: '/demo',
    meta: {
      title: 'Demo',
    },
    redirect: '/demo/child-1',
    component: Layout,
    children: [
      {
        path: '/demo/child-1',
        component: Demo01,
        meta: {
          title: 'child-1',
        },
      },
      {
        path: '/demo/child-2',
        component: Demo02,
        meta: {
          title: 'child-2',
        },
      },
    ]
  },
  /* {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/swipper-demo',
    name: 'swipper-demo',
    component: SwiperDemo,
  }, */
  notFoundRoute, // 404
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
