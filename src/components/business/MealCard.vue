<script setup lang="ts">
import StatusTag from '@/components/common/StatusTag.vue'
import type { MealOption } from '@/types/meal'
import { formatCurrency } from '@/utils/format.util'

defineProps<{
  meal: MealOption
}>()
</script>

<template>
  <article class="meal-card">
    <div class="meal-card__meta">
      <span>{{ meal.category }}</span>
      <StatusTag :status="meal.availability" />
    </div>

    <h3>{{ meal.name }}</h3>
    <p class="meal-card__description">{{ meal.description }}</p>

    <div class="meal-card__tags">
      <a-tag v-for="tag in meal.tags" :key="tag">{{ tag }}</a-tag>
    </div>

    <div class="meal-card__footer">
      <strong>{{ formatCurrency(meal.price) }}</strong>
      <span>{{ meal.servingWindow }}</span>
    </div>
  </article>
</template>

<style scoped>
.meal-card {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-card);
}

.meal-card__meta,
.meal-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.meal-card__meta span {
  color: var(--color-primary);
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h3,
.meal-card__description,
.meal-card__footer strong,
.meal-card__footer span {
  margin: 0;
}

.meal-card__description,
.meal-card__footer span {
  color: var(--color-text-soft);
}

.meal-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
