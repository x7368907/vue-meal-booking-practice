<script setup lang="ts">
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue'

import type { SetMealCardItem } from '@/types/set-meal'

defineProps<{
  card: SetMealCardItem
  quantity: number
  customizationSummary: string[]
}>()

defineEmits<{
  quantityChange: [cardId: string, quantity: number]
  openCustomize: [card: SetMealCardItem]
}>()
</script>

<template>
  <article class="set-meal-card">
    <div class="set-meal-card__main" @click="$emit('openCustomize', card)">
      <div class="set-meal-card__image" :style="{ background: card.imageColor }">
        {{ card.imageLabel }}
      </div>

      <div class="set-meal-card__content">
        <strong>{{ card.name }}</strong>
        <span>${{ card.price }}</span>
      </div>

      <div class="set-meal-card__counter" @click.stop>
        <button type="button" @click="$emit('quantityChange', card.id, Math.max(quantity - 1, 0))">
          <MinusOutlined />
        </button>
        <strong>{{ quantity }}</strong>
        <button type="button" @click="$emit('quantityChange', card.id, quantity + 1)">
          <PlusOutlined />
        </button>
      </div>
    </div>

    <div v-if="customizationSummary.length > 0" class="set-meal-card__options">
      <div
        v-for="summaryLine in customizationSummary"
        :key="`${card.id}-${summaryLine}`"
        class="set-meal-card__option-row"
      >
        <span>{{ summaryLine }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.set-meal-card {
  overflow: hidden;
  border: 1px solid #e8ebf0;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.04);
}

.set-meal-card__main {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 12px 12px 10px;
  cursor: pointer;
}

.set-meal-card__image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
}

.set-meal-card__content {
  min-width: 0;
  flex: 1;
}

.set-meal-card__content strong,
.set-meal-card__content span {
  display: block;
  margin: 0;
}

.set-meal-card__content strong {
  color: #4b5563;
  font-size: 13px;
  line-height: 1.35;
}

.set-meal-card__content span {
  margin-top: 4px;
  color: #7c8591;
  font-size: 13px;
}

.set-meal-card__counter {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7b8490;
}

.set-meal-card__counter button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.set-meal-card__counter strong {
  font-size: 14px;
}

.set-meal-card__options {
  padding: 0 12px 10px 64px;
  border-top: 1px solid #eef1f4;
}

.set-meal-card__option-row {
  display: flex;
  gap: 8px;
  padding-top: 6px;
  color: #6f7883;
  font-size: 12px;
  line-height: 1.5;
}
</style>
