import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useBookingStore } from '@/stores/booking.store'
import { useBuffetStore } from '@/stores/buffet.store'
import { buffetPageConfig } from '@/configs/buffet.config'
import { buildBuffetPickupTickets } from '@/utils/buffet.util'

export const useBuffetPage = () => {
  const buffetStore = useBuffetStore()
  const bookingStore = useBookingStore()
  const isSuccessModalOpen = ref(false)
  const searchForm = ref({
    location: '',
    diningDate: '',
  })

  const {
    cutoffLines,
    flattenedMeals,
    isLoading,
    locationOptions,
    selectedDiningDate,
    selectedLocation,
    visibleSections,
  } = storeToRefs(buffetStore)
  const { isSubmitting, lastSubmission, selections } = storeToRefs(bookingStore)

  const selectedQuantities = computed(() => selections.value.buffet)
  const summary = computed(() => bookingStore.getSummary(buffetPageConfig.mealType, flattenedMeals.value))
  const canSubmit = computed(() => summary.value.totalQuantity > 0)
  const submitting = computed(() => isSubmitting.value.buffet)
  const submissionResult = computed(() => lastSubmission.value.buffet)
  const selectedLocationLabel = computed(
    () => locationOptions.value.find((item) => item.value === selectedLocation.value)?.label ?? '',
  )
  const pickupTickets = computed(() =>
    buildBuffetPickupTickets(flattenedMeals.value, selectedQuantities.value, selectedLocationLabel.value),
  )

  const increaseQuantity = (mealId: string, currentQuantity: number, quantityLimit: number) => {
    bookingStore.updateSelection(buffetPageConfig.mealType, mealId, Math.min(currentQuantity + 1, quantityLimit))
  }

  const decreaseQuantity = (mealId: string, currentQuantity: number) => {
    bookingStore.updateSelection(buffetPageConfig.mealType, mealId, Math.max(currentQuantity - 1, 0))
  }

  const submitBooking = async () => {
    const response = await bookingStore.submitBooking(buffetPageConfig.mealType, flattenedMeals.value)

    if (response) {
      isSuccessModalOpen.value = true
    }
  }

  const closeSuccessModal = () => {
    isSuccessModalOpen.value = false
  }

  const handleSearch = () => {
    buffetStore.searchSections(searchForm.value)
  }

  onMounted(() => {
    buffetStore.fetchBuffetPageData().then(() => {
      searchForm.value = {
        location: selectedLocation.value,
        diningDate: selectedDiningDate.value,
      }
    })
  })

  return {
    cutoffLines,
    handleSearch,
    isLoading,
    isSuccessModalOpen,
    searchForm,
    selectedLocationLabel,
    selectedQuantities,
    canSubmit,
    submitBooking,
    submitting,
    summary,
    pickupTickets,
    visibleSections,
    closeSuccessModal,
    decreaseQuantity,
    increaseQuantity,
    locationOptions,
  }
}
