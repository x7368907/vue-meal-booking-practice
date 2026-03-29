import { setMealMockData } from '@/mocks/setMeal.mockData'

export const setMealApi = {
  async getSetMealPageData() {
    return Promise.resolve(setMealMockData)
  },
}
