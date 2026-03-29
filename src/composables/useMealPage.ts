import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useBookingStore } from '@/stores/booking.store'
import { useMealStore } from '@/stores/meal.store'
import type { BookingContactForm } from '@/types/booking'
import type { MealType } from '@/types/meal'

export const useMealPage = (mealType: MealType) => {
  const mealStore = useMealStore()
  const bookingStore = useBookingStore()
  const { catalog, isLoading } = storeToRefs(mealStore)
  const { forms, isSubmitting, lastSubmission, selections } = storeToRefs(bookingStore)

  const meals = computed(() => catalog.value[mealType])
  const loading = computed(() => isLoading.value[mealType])
  const selectedQuantities = computed(() => selections.value[mealType])
  const bookingForm = computed<BookingContactForm>({
    get: () => forms.value[mealType],
    set: (value) => bookingStore.updateForm(mealType, value),
  })
  const summary = computed(() => bookingStore.getSummary(mealType, meals.value))
  const submitting = computed(() => isSubmitting.value[mealType])
  const submissionResult = computed(() => lastSubmission.value[mealType])
  const featuredMeals = computed(() => meals.value.slice(0, 2))
  const hasSelection = computed(() => summary.value.totalQuantity > 0)

  const updateQuantity = (mealId: string, quantity: number) => {
    bookingStore.updateSelection(mealType, mealId, quantity)
  }

  const submitBooking = async () => {
    return bookingStore.submitBooking(mealType, meals.value)
  }

  const resetBooking = () => {
    bookingStore.resetBooking(mealType)
  }

  onMounted(() => {
    mealStore.fetchMeals(mealType)
  })

  return {
    meals,
    loading,
    featuredMeals,
    selectedQuantities,
    bookingForm,
    summary,
    hasSelection,
    submitting,
    submissionResult,
    updateQuantity,
    submitBooking,
    resetBooking,
  }
}
