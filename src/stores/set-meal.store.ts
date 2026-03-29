import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { setMealService } from '@/services/set-meal.service'
import type {
  SetMealCardItem,
  SetMealCustomizationState,
  SetMealLocationOption,
  SetMealPeriodOption,
} from '@/types/set-meal'
import { flattenSetMealCards } from '@/utils/set-meal.util'

export const useSetMealStore = defineStore('set-meal', () => {
  const locationOptions = ref<SetMealLocationOption[]>([])
  const periodOptions = ref<SetMealPeriodOption[]>([])
  const cards = ref<SetMealCardItem[]>([])
  const selectedLocation = ref('')
  const selectedDiningDate = ref('')
  const selectedPeriod = ref('')
  const pickupTime = ref('')
  const extension = ref('')
  const customizations = ref<Record<string, SetMealCustomizationState>>({})
  const isLoading = ref(false)

  const flattenedCards = computed(() => flattenSetMealCards(cards.value))

  const fetchSetMealPageData = async () => {
    isLoading.value = true

    try {
      const response = await setMealService.getSetMealPageData()
      locationOptions.value = response.locationOptions
      periodOptions.value = response.periodOptions
      cards.value = response.cards
      selectedLocation.value = response.defaultLocation
      selectedDiningDate.value = response.defaultDiningDate
      selectedPeriod.value = response.defaultPeriod
      pickupTime.value = response.defaultPickupTime
      extension.value = response.defaultExtension
    } finally {
      isLoading.value = false
    }
  }

  const updateFilters = (payload: {
    location: string
    diningDate: string
    period: string
    pickupTime: string
  }) => {
    selectedLocation.value = payload.location
    selectedDiningDate.value = payload.diningDate
    selectedPeriod.value = payload.period
    pickupTime.value = payload.pickupTime
  }

  const saveCustomization = (cardId: string, customization: SetMealCustomizationState) => {
    customizations.value[cardId] = customization
  }

  return {
    locationOptions,
    periodOptions,
    cards,
    selectedLocation,
    selectedDiningDate,
    selectedPeriod,
    pickupTime,
    extension,
    customizations,
    flattenedCards,
    isLoading,
    fetchSetMealPageData,
    updateFilters,
    saveCustomization,
  }
})
