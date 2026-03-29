import { ref } from 'vue'
import { defineStore } from 'pinia'

import { bookingService } from '@/services/booking.service'
import type {
  BookingContactForm,
  BookingSubmitResult,
  BookingSummary,
} from '@/types/booking'
import type { MealType } from '@/types/meal'
import { buildBookingPayload, buildBookingSummary, getDefaultBookingForm } from '@/utils/meal.util'

interface BookingMealSource {
  id: string
  name: string
  price: number
}

const createMealRecord = <T>(factory: () => T): Record<MealType, T> => ({
  buffet: factory(),
  bento: factory(),
  'set-meal': factory(),
})

export const useBookingStore = defineStore('booking', () => {
  const selections = ref<Record<MealType, Record<string, number>>>(createMealRecord(() => ({})))
  const forms = ref<Record<MealType, BookingContactForm>>(
    createMealRecord(() => getDefaultBookingForm()),
  )
  const isSubmitting = ref<Record<MealType, boolean>>(createMealRecord(() => false))
  const lastSubmission = ref<Record<MealType, BookingSubmitResult | null>>(createMealRecord(() => null))

  const updateSelection = (mealType: MealType, mealId: string, quantity: number) => {
    if (quantity <= 0) {
      delete selections.value[mealType][mealId]
      return
    }

    selections.value[mealType][mealId] = quantity
  }

  const updateForm = (mealType: MealType, payload: Partial<BookingContactForm>) => {
    forms.value[mealType] = {
      ...forms.value[mealType],
      ...payload,
    }
  }

  const getSummary = (mealType: MealType, meals: BookingMealSource[]): BookingSummary => {
    return buildBookingSummary(meals, selections.value[mealType])
  }

  const resetBooking = (mealType: MealType) => {
    selections.value[mealType] = {}
    forms.value[mealType] = getDefaultBookingForm()
    lastSubmission.value[mealType] = null
  }

  const submitBooking = async (mealType: MealType, meals: BookingMealSource[]) => {
    isSubmitting.value[mealType] = true

    try {
      const payload = buildBookingPayload(mealType, meals, forms.value[mealType], selections.value[mealType])
      const response = await bookingService.submitBooking(payload)
      lastSubmission.value[mealType] = response
      return response
    } finally {
      isSubmitting.value[mealType] = false
    }
  }

  return {
    selections,
    forms,
    isSubmitting,
    lastSubmission,
    updateSelection,
    updateForm,
    getSummary,
    resetBooking,
    submitBooking,
  }
})
