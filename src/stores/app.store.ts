import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { navigationItems } from '@/configs/navigation.config'

export const useAppStore = defineStore('app', () => {
  const isSidebarCollapsed = ref(false)

  const menuItems = computed(() =>
    navigationItems.map((item) => ({
      key: item.path,
      label: item.label,
    })),
  )

  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  return {
    isSidebarCollapsed,
    menuItems,
    toggleSidebar,
  }
})
