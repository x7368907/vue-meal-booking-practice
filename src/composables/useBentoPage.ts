import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { bentoPageConfig } from '@/configs/bento.config'
import { useBookingStore } from '@/stores/booking.store'
import { useBentoStore } from '@/stores/bento.store'
import { buildBentoPickupTickets } from '@/utils/bento.util'

export const useBentoPage = () => {
  const bentoStore = useBentoStore()
  const bookingStore = useBookingStore()
  const expandedCardIds = ref<string[]>([])
  const isSuccessModalOpen = ref(false)
  const searchForm = ref({
    location: '',
    diningDate: '',
  })

  const {
    cutoffLines,
    extension,
    flattenedOptions,
    isLoading,
    locationOptions,
    selectedDiningDate,
    selectedLocation,
    visibleSections,
  } = storeToRefs(bentoStore)
  const { isSubmitting, selections } = storeToRefs(bookingStore)

  const selectedQuantities = computed(() => selections.value.bento)
  const summary = computed(() => bookingStore.getSummary(bentoPageConfig.mealType, flattenedOptions.value))
  const canSubmit = computed(() => summary.value.totalQuantity > 0)
  const submitting = computed(() => isSubmitting.value.bento)
  const selectedLocationLabel = computed(
    () => locationOptions.value.find((item) => item.value === selectedLocation.value)?.label ?? '',
  )
  const pickupTickets = computed(() =>
    buildBentoPickupTickets(visibleSections.value, selectedQuantities.value, selectedLocationLabel.value),
  )

  const toggleCard = (cardId: string) => {
    if (expandedCardIds.value.includes(cardId)) {
      expandedCardIds.value = expandedCardIds.value.filter((id) => id !== cardId)
      return
    }

    expandedCardIds.value = [...expandedCardIds.value, cardId]
  }

  const updateQuantity = (optionId: string, quantity: number) => {
    bookingStore.updateSelection(bentoPageConfig.mealType, optionId, quantity)
  }

  const submitBooking = async () => {
    const response = await bookingStore.submitBooking(bentoPageConfig.mealType, flattenedOptions.value)

    if (response) {
      isSuccessModalOpen.value = true
    }

    return response
  }

  const updateExtension = (value: string) => {
    extension.value = value
  }

  const closeSuccessModal = () => {
    isSuccessModalOpen.value = false
  }

  const handleSearch = () => {
    bentoStore.searchSections(searchForm.value)
  }

  onMounted(() => {
    bentoStore.fetchBentoPageData().then(() => {
      searchForm.value = {
        location: selectedLocation.value,
        diningDate: selectedDiningDate.value,
      }
      expandedCardIds.value = visibleSections.value
        .flatMap((section) => section.cards)
        .filter((card) => card.isExpandedByDefault)
        .map((card) => card.id)
    })
  })

  return {
    cutoffLines,
    closeSuccessModal,
    extension,
    expandedCardIds,
    handleSearch,
    isLoading,
    isSuccessModalOpen,
    locationOptions,
    pickupTickets,
    searchForm,
    selectedLocationLabel,
    selectedQuantities,
    canSubmit,
    submitBooking,
    submitting,
    summary,
    toggleCard,
    updateExtension,
    updateQuantity,
    visibleSections,
  }
}
