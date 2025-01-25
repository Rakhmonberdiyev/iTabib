import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue'),
    },
    {
      name: 'my-foods',
      path: '/my-foods',
      component: () => import('../views/MyFoodsView.vue'),
    },
    {
      name: 'user-profile',
      path: '/user-profile',
      component: () => import('../views/UserProfileView.vue'),
    },
    {
      name: 'calculator',
      path: '/calculator',
      component: () => import('../views/Calculator.vue'),
    },
    {
      name: 'air-quality',
      path: '/air-quality',
      component: () => import('../views/AirQualityView.vue'),
    }
  ],
})

export default router
