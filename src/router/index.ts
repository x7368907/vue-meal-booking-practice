import { createRouter, createWebHistory } from 'vue-router'

import AppShell from '@/components/common/AppShell.vue'
import BentoPage from '@/pages/bento/BentoPage.vue'
import BuffetPage from '@/pages/buffet/BuffetPage.vue'
import SetMealPage from '@/pages/set-meal/SetMealPage.vue'
import TakeoutRecordPage from '@/pages/takeout-record/TakeoutRecordPage.vue'
import WeeklyMenuPage from '@/pages/weekly-menu/WeeklyMenuPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppShell,
      redirect: '/buffet',
      children: [
        {
          path: 'takeout-record',
          name: 'takeout-record',
          component: TakeoutRecordPage,
          meta: {
            title: 'Takeout Record',
          },
        },
        {
          path: 'buffet',
          name: 'buffet',
          component: BuffetPage,
          meta: {
            title: 'Buffet Booking',
          },
        },
        {
          path: 'bento',
          name: 'bento',
          component: BentoPage,
          meta: {
            title: 'Bento Booking',
          },
        },
        {
          path: 'set-meal',
          name: 'set-meal',
          component: SetMealPage,
          meta: {
            title: 'Set Meal Booking',
          },
        },
        {
          path: 'weekly-menu',
          name: 'weekly-menu',
          component: WeeklyMenuPage,
          meta: {
            title: 'Weekly Menu',
          },
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : 'Meal Booking Practice'
  document.title = `${pageTitle} | Meal Booking Practice`
})

export default router
