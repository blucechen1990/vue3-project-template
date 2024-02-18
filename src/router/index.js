import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import demoRoute1 from './demoRoute1'
import userRoute from './userRoute'
import notFound from './notFound'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [home, demoRoute1, userRoute, notFound]
})

export default router
