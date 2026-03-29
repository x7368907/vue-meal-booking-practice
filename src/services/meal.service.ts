import { mealApi } from '@/api/meal.api'
import type { MealOption, MealType } from '@/types/meal'

const availabilityWeight: Record<MealOption['availability'], number> = {
  available: 0,
  limited: 1,
  'sold-out': 2,
}

export const mealService = {
  async getMeals(mealType: MealType) {
    const meals = await mealApi.getMeals(mealType)

    return meals.slice().sort((left, right) => {
      return availabilityWeight[left.availability] - availabilityWeight[right.availability]
    })
  },
}
