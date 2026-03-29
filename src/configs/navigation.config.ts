export interface NavigationItem {
  key: string
  label: string
  path: string
  description: string
}

export const navigationItems: NavigationItem[] = [
  {
    key: 'buffet',
    label: 'Buffet',
    path: '/buffet',
    description: '自助餐報餐頁',
  },
  {
    key: 'bento',
    label: 'Bento',
    path: '/bento',
    description: '便當報餐頁',
  },
  {
    key: 'set-meal',
    label: 'Set Meal',
    path: '/set-meal',
    description: '套餐報餐頁',
  },
]
