import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { bentoService } from '@/services/bento.service'
import type { BentoDateSection, BentoLocationOption } from '@/types/bento'
import { filterBentoSections, flattenBentoOptions } from '@/utils/bento.util'

export const useBentoStore = defineStore('bento', () => {
  const locationOptions = ref<BentoLocationOption[]>([])
  const cutoffLines = ref<string[]>([])
  const sections = ref<BentoDateSection[]>([])
  const selectedLocation = ref('')
  const selectedDiningDate = ref('')
  const extension = ref('')
  const isLoading = ref(false)

  const visibleSections = computed(() =>
    filterBentoSections(sections.value, selectedDiningDate.value),
  )

  const flattenedOptions = computed(() => flattenBentoOptions(visibleSections.value))

  const fetchBentoPageData = async () => {
    isLoading.value = true

    try {
      const response = await bentoService.getBentoPageData()
      locationOptions.value = response.locationOptions
      cutoffLines.value = response.cutoffLines
      sections.value = response.sections
      selectedLocation.value = response.defaultLocation
      selectedDiningDate.value = response.defaultDiningDate
      extension.value = response.defaultExtension
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
    extension,
    visibleSections,
    flattenedOptions,
    isLoading,
    fetchBentoPageData,
    searchSections,
  }
})
