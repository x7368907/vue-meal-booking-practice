<script setup lang="ts">
import BuffetMealCard from '@/components/business/BuffetMealCard.vue'
import type { BuffetDateSection as BuffetDateSectionType } from '@/types/buffet'

defineProps<{
  section: BuffetDateSectionType
  quantities: Record<string, number>
}>()

defineEmits<{
  decrease: [mealId: string, currentQuantity: number]
  increase: [mealId: string, currentQuantity: number, quantityLimit: number]
}>()
</script>

<template>
  <section class="buffet-date-section">
    <h2>{{ section.displayDate }}</h2>

    <p v-if="section.status === 'unpublished'" class="buffet-date-section__message">
      {{ section.message }}
    </p>

    <div v-if="section.notices?.length" class="buffet-date-section__notices">
      <p v-for="notice in section.notices" :key="`${section.id}-${notice.mealPeriod}`">
        {{ notice.mealPeriod }}：{{ notice.message }}
      </p>
    </div>

    <div v-if="section.meals.length" class="buffet-date-section__cards">
      <BuffetMealCard
        v-for="meal in section.meals"
        :key="meal.id"
        :meal="meal"
        :quantity="quantities[meal.id] ?? 0"
        @decrease="$emit('decrease', meal.id, quantities[meal.id] ?? 0)"
        @increase="$emit('increase', meal.id, quantities[meal.id] ?? 0, meal.quantityLimit)"
      />
    </div>
  </section>
</template>

<style scoped>
.buffet-date-section {
  padding: 22px 0 20px;
  border-bottom: 1px solid #d8dce3;
}

.buffet-date-section h2 {
  margin: 0 0 10px;
  color: #1890ff;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
}

.buffet-date-section__message,
.buffet-date-section__notices p {
  margin: 0;
  color: #6d7681;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.75;
}

.buffet-date-section__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.buffet-date-section__cards :deep(.buffet-meal-card) {
  width: 228px;
}

@media (max-width: 900px) {
  .buffet-date-section h2 {
    font-size: 16px;
  }

  .buffet-date-section__message,
  .buffet-date-section__notices p {
    font-size: 14px;
  }
}
</style>
