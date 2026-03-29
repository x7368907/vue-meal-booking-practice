import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { buffetService } from '@/services/buffet.service'
import type { BuffetDateSection, BuffetLocationOption } from '@/types/buffet'
import { filterBuffetSections, flattenBuffetMeals } from '@/utils/buffet.util'

export const useBuffetStore = defineStore('buffet', () => {
  const locationOptions = ref<BuffetLocationOption[]>([])
  const cutoffLines = ref<string[]>([])
  const sections = ref<BuffetDateSection[]>([])
  const selectedLocation = ref('')
  const selectedDiningDate = ref('')
  const isLoading = ref(false)

  const visibleSections = computed(() =>
    filterBuffetSections(sections.value, selectedDiningDate.value),
  )

  const flattenedMeals = computed(() => flattenBuffetMeals(visibleSections.value))

  const fetchBuffetPageData = async () => {
    isLoading.value = true

    try {
      const response = await buffetService.getBuffetPageData()
      locationOptions.value = response.locationOptions
      cutoffLines.value = response.cutoffLines
      sections.value = response.sections
      selectedLocation.value = response.defaultLocation
      selectedDiningDate.value = response.defaultDiningDate
    } finally {
      isLoading.value = false
    }
  }

  const searchSections = (payload: { location: string; diningDate: string }) => {
    selectedLocation.value = payload.location
    selectedDiningDate.value = payload.diningDate
  }

  return {
    locationOptions,
    cutoffLines,
    sections,
    selectedLocation,
    selectedDiningDate,
    visibleSections,
    flattenedMeals,
    isLoading,
    fetchBuffetPageData,
    searchSections,
  }
})
