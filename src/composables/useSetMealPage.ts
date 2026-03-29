import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { setMealPageConfig } from '@/configs/setMeal.config'
import { useBookingStore } from '@/stores/booking.store'
import { useSetMealStore } from '@/stores/set-meal.store'
import type { SetMealCardItem, SetMealCustomizationState } from '@/types/set-meal'
import {
  buildSetMealSubmitTicket,
  buildSetMealCustomizationSummary,
  cloneCustomizationState,
  getDefaultCustomizationState,
} from '@/utils/set-meal.util'

export const useSetMealPage = () => {
  const setMealStore = useSetMealStore()
  const bookingStore = useBookingStore()
  const isCustomizeModalOpen = ref(false)
  const isSuccessModalOpen = ref(false)
  const activeCardId = ref('')
  const customizationDraft = ref<SetMealCustomizationState>({
    excludes: [],
    drink: '',
    sugarLevel: '',
    iceLevel: '',
  })
  const searchForm = ref({
    location: '',
    diningDate: '',
    period: '',
    pickupTime: '',
  })

  const {
    cards,
    customizations,
    extension,
    flattenedCards,
    isLoading,
    locationOptions,
    periodOptions,
    pickupTime,
    selectedDiningDate,
    selectedLocation,
    selectedPeriod,
  } = storeToRefs(setMealStore)
  const { isSubmitting, selections } = storeToRefs(bookingStore)

  const selectedQuantities = computed(() => selections.value['set-meal'])
  const summary = computed(() => bookingStore.getSummary(setMealPageConfig.mealType, flattenedCards.value))
  const canSubmit = computed(() => summary.value.totalQuantity > 0)
  const submitting = computed(() => isSubmitting.value['set-meal'])
  const selectedLocationLabel = computed(
    () => locationOptions.value.find((item) => item.value === selectedLocation.value)?.label ?? '',
  )
  const activeCard = computed<SetMealCardItem | null>(
    () => cards.value.find((card) => card.id === activeCardId.value) ?? null,
  )
  const submitTicket = computed(() =>
    buildSetMealSubmitTicket({
      cards: cards.value,
      selections: selectedQuantities.value,
      customizations: customizations.value,
      locationLabel: selectedLocationLabel.value,
      diningDate: selectedDiningDate.value,
      pickupTime: pickupTime.value,
    }),
  )

  const updateQuantity = (cardId: string, quantity: number) => {
    bookingStore.updateSelection(setMealPageConfig.mealType, cardId, quantity)
  }

  const submitBooking = async () => {
    const response = await bookingStore.submitBooking(setMealPageConfig.mealType, flattenedCards.value)

    if (response) {
      isSuccessModalOpen.value = true
    }

    return response
  }

  const updateExtension = (value: string) => {
    extension.value = value
  }

  const handleSearch = () => {
    setMealStore.updateFilters(searchForm.value)
  }

  const openCustomizeModal = (card: SetMealCardItem) => {
    activeCardId.value = card.id
    customizationDraft.value = cloneCustomizationState(
      customizations.value[card.id] ?? getDefaultCustomizationState(card.customizationConfig),
    )
    isCustomizeModalOpen.value = true
  }

  const closeCustomizeModal = () => {
    isCustomizeModalOpen.value = false
  }

  const closeSuccessModal = () => {
    isSuccessModalOpen.value = false
  }

  const saveCustomization = () => {
    if (!activeCard.value) {
      return
    }

    setMealStore.saveCustomization(activeCard.value.id, cloneCustomizationState(customizationDraft.value))
    isCustomizeModalOpen.value = false
  }

  const toggleExclude = (value: string) => {
    const exists = customizationDraft.value.excludes.includes(value)

    customizationDraft.value = {
      ...customizationDraft.value,
      excludes: exists
        ? customizationDraft.value.excludes.filter((item) => item !== value)
        : [...customizationDraft.value.excludes, value],
    }
  }

  const updateDrink = (value: string) => {
    customizationDraft.value = {
      ...customizationDraft.value,
      drink: value,
    }
  }

  const updateSugarLevel = (value: string) => {
    customizationDraft.value = {
      ...customizationDraft.value,
      sugarLevel: value,
    }
  }

  const updateIceLevel = (value: string) => {
    customizationDraft.value = {
      ...customizationDraft.value,
      iceLevel: value,
    }
  }

  const getCustomizationSummary = (cardId: string): string[] =>
    buildSetMealCustomizationSummary(customizations.value[cardId])

  onMounted(() => {
    setMealStore.fetchSetMealPageData().then(() => {
      searchForm.value = {
        location: selectedLocation.value,
        diningDate: selectedDiningDate.value,
        period: selectedPeriod.value,
        pickupTime: pickupTime.value,
      }
    })
  })

  return {
    activeCard,
    cards,
    closeCustomizeModal,
    closeSuccessModal,
    customizationDraft,
    extension,
    getCustomizationSummary,
    handleSearch,
    isCustomizeModalOpen,
    isSuccessModalOpen,
    isLoading,
    locationOptions,
    openCustomizeModal,
    periodOptions,
    saveCustomization,
    searchForm,
    selectedQuantities,
    canSubmit,
    submitTicket,
    submitBooking,
    submitting,
    summary,
    toggleExclude,
    updateDrink,
    updateExtension,
    updateIceLevel,
    updateQuantity,
    updateSugarLevel,
  }
}
