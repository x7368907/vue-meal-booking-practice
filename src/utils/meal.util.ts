import type {
  BookingContactForm,
  BookingSubmitPayload,
  BookingSummary,
} from '@/types/booking'
import type { MealType } from '@/types/meal'

interface BookingMealSource {
  id: string
  name: string
  price: number
}

export const getDefaultBookingForm = (): BookingContactForm => ({
  contactName: '',
  department: '',
  diningDate: new Date().toISOString().slice(0, 10),
  note: '',
})

export const buildBookingSummary = (
  meals: BookingMealSource[],
  selections: Record<string, number>,
): BookingSummary => {
  const items = meals
    .filter((meal) => (selections[meal.id] ?? 0) > 0)
    .map((meal) => {
      const quantity = selections[meal.id] ?? 0

      return {
        mealId: meal.id,
        mealName: meal.name,
        quantity,
        subtotal: meal.price * quantity,
      }
    })

  return {
    items,
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    totalAmount: items.reduce((total, item) => total + item.subtotal, 0),
  }
}

export const buildBookingPayload = (
  mealType: MealType,
  meals: BookingMealSource[],
  contact: BookingContactForm,
  selections: Record<string, number>,
): BookingSubmitPayload => ({
  mealType,
  contact,
  selections: meals
    .filter((meal) => (selections[meal.id] ?? 0) > 0)
    .map((meal) => {
      const quantity = selections[meal.id] ?? 0

      return {
        mealId: meal.id,
        quantity,
      }
    }),
})
