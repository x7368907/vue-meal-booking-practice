import { ref } from 'vue'
import { defineStore } from 'pinia'

import { mealService } from '@/services/meal.service'
import type { MealOption, MealType } from '@/types/meal'

const createMealRecord = <T>(factory: () => T): Record<MealType, T> => ({
  buffet: factory(),
  bento: factory(),
  'set-meal': factory(),
})

export const useMealStore = defineStore('meal', () => {
  const catalog = ref<Record<MealType, MealOption[]>>(createMealRecord(() => []))
  const isLoading = ref<Record<MealType, boolean>>(createMealRecord(() => false))

  const fetchMeals = async (mealType: MealType) => {
    isLoading.value[mealType] = true

    try {
      catalog.value[mealType] = await mealService.getMeals(mealType)
    } finally {
      isLoading.value[mealType] = false
    }
  }

  return {
    catalog,
    isLoading,
    fetchMeals,
  }
})
