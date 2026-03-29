export type MealType = 'buffet' | 'bento' | 'set-meal'

export type MealAvailability = 'available' | 'limited' | 'sold-out'

export interface MealOption {
  id: string
  mealType: MealType
  name: string
  category: string
  description: string
  price: number
  availableQuantity: number
  servingWindow: string
  availability: MealAvailability
  tags: string[]
}
