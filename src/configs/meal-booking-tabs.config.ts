import type { MealBookingTabItem } from '@/types/meal-booking-tab'

export const mealBookingTabsConfig: MealBookingTabItem[] = [
  {
    key: 'takeout-record',
    label: '帶餐紀錄',
    path: '/takeout-record',
  },
  {
    key: 'buffet-booking',
    label: '自助餐報餐',
    path: '/buffet',
  },
  {
    key: 'bento-booking',
    label: '便當報餐',
    path: '/bento',
  },
  {
    key: 'set-meal-booking',
    label: '套餐報餐',
    path: '/set-meal',
  },
  {
    key: 'weekly-menu',
    label: '每週菜單',
    path: '/weekly-menu',
  },
]
