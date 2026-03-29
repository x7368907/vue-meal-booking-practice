<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import type { MealBookingTabItem } from '@/types/meal-booking-tab'

defineProps<{
  items: MealBookingTabItem[]
}>()

const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
  <nav class="meal-booking-tabs">
    <RouterLink
      v-for="item in items"
      :key="item.key"
      :to="item.path"
      class="meal-booking-tabs__item"
      :class="{ 'meal-booking-tabs__item--active': isActive(item.path) }"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.meal-booking-tabs {
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 0 0 13px;
  border-bottom: 1px solid #d6dae1;
  overflow-x: auto;
}

.meal-booking-tabs__item {
  position: relative;
  padding: 0 0 9px;
  color: #6b7280;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.meal-booking-tabs__item--active {
  color: #1f2937;
}

.meal-booking-tabs__item--active::after {
  content: '';
  position: absolute;
  left: 2px;
  right: 2px;
  bottom: -14px;
  height: 2px;
  background: #1890ff;
  border-radius: 999px;
}
</style>
