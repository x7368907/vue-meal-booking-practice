import { bentoMockData } from '@/mocks/bento.mockData'
import { buffetMockData } from '@/mocks/buffet.mockData'
import { setMealMockData } from '@/mocks/setMeal.mockData'
import type { MealOption, MealType } from '@/types/meal'

const mealMap: Record<MealType, MealOption[]> = {
  buffet: buffetMockData.sections.flatMap((section) =>
    section.meals.map((meal) => ({
      id: meal.id,
      mealType: 'buffet',
      name: meal.name,
      category: meal.mealPeriod,
      description: meal.description,
      price: meal.price,
      availableQuantity: meal.quantityLimit,
      servingWindow: section.displayDate,
      availability: 'available',
      tags: [meal.mealPeriod],
    })),
  ),
  bento: bentoMockData.sections.flatMap((section) =>
    section.cards.flatMap((card) =>
      card.options.map((option) => ({
        id: option.id,
        mealType: 'bento',
        name: option.name,
        category: card.mealPeriod,
        description: option.name,
        price: option.price,
        availableQuantity: 99,
        servingWindow: section.displayDate,
        availability: 'available',
        tags: [card.mealPeriod],
      })),
    ),
  ),
  'set-meal': setMealMockData.cards.map((card) => ({
    id: card.id,
    mealType: 'set-meal',
    name: card.name,
    category: '套餐',
    description: card.name,
    price: card.price,
    availableQuantity: 99,
    servingWindow: setMealMockData.defaultPickupTime,
    availability: 'available',
    tags: card.optionGroups?.map((option) => option.title) ?? [],
  })),
}

export const mealApi = {
  async getMeals(mealType: MealType) {
    return Promise.resolve(mealMap[mealType])
  },
}
