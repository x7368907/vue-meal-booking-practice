<script setup lang="ts">
import { computed } from 'vue'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'

import type { BuffetMealItem } from '@/types/buffet'

const props = defineProps<{
  meal: BuffetMealItem
  quantity: number
}>()

const emit = defineEmits<{
  decrease: []
  increase: []
}>()

const toneClass = computed(() => `buffet-meal-card--${props.meal.tone}`)
</script>

<template>
  <article class="buffet-meal-card" :class="toneClass">
    <div class="buffet-meal-card__content">
      <p class="buffet-meal-card__period">{{ meal.mealPeriod }}</p>
      <h3>{{ meal.name }}</h3>
    </div>

    <div class="buffet-meal-card__counter">
      <button type="button" @click="emit('decrease')">
        <MinusOutlined />
      </button>
      <strong>{{ quantity }}</strong>
      <button type="button" @click="emit('increase')">
        <PlusOutlined />
      </button>
    </div>
  </article>
</template>

<style scoped>
.buffet-meal-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  min-height: 74px;
  padding: 10px 12px;
  border-radius: 10px;
}

.buffet-meal-card--lunch {
  background: #fff4c7;
}

.buffet-meal-card--tea {
  background: #dff8e8;
}

.buffet-meal-card--dinner {
  background: #dcedfb;
}

.buffet-meal-card__content {
  display: grid;
  gap: 2px;
}

.buffet-meal-card__period {
  margin: 0;
  color: #1890ff;
  font-size: 13px;
  font-weight: 700;
}

h3,
span {
  margin: 0;
  color: #374151;
  font-size: 12px;
  line-height: 1.55;
}

.buffet-meal-card__counter {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: #6b7280;
}

.buffet-meal-card__counter button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
}

.buffet-meal-card__counter strong {
  min-width: 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}
</style>
