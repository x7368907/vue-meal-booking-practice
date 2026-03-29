import { setMealApi } from '@/api/set-meal.api'

export const setMealService = {
  async getSetMealPageData() {
    return setMealApi.getSetMealPageData()
  },
}
