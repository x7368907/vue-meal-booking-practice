import type { SetMealPageResponse } from '@/types/set-meal'

const commonCustomizationConfig = {
  excludes: [
    { label: '不醬', value: '不醬' },
    { label: '不菜', value: '不菜' },
    { label: '不蛋', value: '不蛋' },
  ],
  drinks: [
    { label: '紅茶', value: '紅茶' },
    { label: '奶茶', value: '奶茶' },
    { label: '豆漿', value: '豆漿' },
  ],
  sugarLevels: [
    { label: '全糖', value: '全糖' },
    { label: '少糖', value: '少糖' },
    { label: '半糖', value: '半糖' },
    { label: '微糖', value: '微糖' },
    { label: '無糖', value: '無糖' },
  ],
  iceLevels: [
    { label: '正常冰', value: '正常冰' },
    { label: '少冰', value: '少冰' },
    { label: '半冰', value: '半冰' },
    { label: '微冰', value: '微冰' },
    { label: '去冰', value: '去冰' },
  ],
}

export const setMealMockData: SetMealPageResponse = {
  locationOptions: [
    {
      label: '大成台南總部',
      value: 'tainan-hq',
    },
    {
      label: '台北辦公室',
      value: 'taipei-office',
    },
  ],
  periodOptions: [
    {
      label: '早餐',
      value: 'breakfast',
    },
    {
      label: '午餐',
      value: 'lunch',
    },
  ],
  defaultLocation: 'tainan-hq',
  defaultDiningDate: '2026-02-02',
  defaultPeriod: 'breakfast',
  defaultPickupTime: '08:15',
  defaultExtension: '#5311',
  cards: [
    {
      id: 'SET-CARD-001',
      name: '牛肉蔬菜蛋堡套餐',
      price: 70,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-002',
      name: '咔啦雞腿蛋堡套餐',
      price: 70,
      imageLabel: '餐',
      imageColor: '#e2b066',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-003',
      name: '鮪魚蛋餅套餐',
      price: 60,
      imageLabel: '餐',
      imageColor: '#d6ae67',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-004',
      name: '豬排蛋餅套餐',
      price: 60,
      imageLabel: '餐',
      imageColor: '#d1a35d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-005',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-006',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-007',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-008',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-009',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-010',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-011',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
    {
      id: 'SET-CARD-012',
      name: '餐點',
      price: 60,
      imageLabel: '餐',
      imageColor: '#f2c66d',
      customizationConfig: commonCustomizationConfig,
    },
  ],
}
