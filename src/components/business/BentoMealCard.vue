<script setup lang="ts">
import { computed } from 'vue'
import { DownOutlined, MinusOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons-vue'

import type { BentoMealCard as BentoMealCardType } from '@/types/bento'
import { buildBentoCardSummary, getOptionQuantity } from '@/utils/bento.util'

const props = defineProps<{
  card: BentoMealCardType
  quantities: Record<string, number>
  expanded: boolean
}>()

const emit = defineEmits<{
  toggle: []
  quantityChange: [optionId: string, quantity: number]
}>()

const toneClass = computed(() => `bento-meal-card--${props.card.tone}`)
const summary = computed(() => buildBentoCardSummary(props.card, props.quantities))
</script>

<template>
  <article class="bento-meal-card" :class="[toneClass, { 'bento-meal-card--expanded': expanded }]">
    <div class="bento-meal-card__header">
      <div class="bento-meal-card__header-main">
        <p class="bento-meal-card__period">{{ card.mealPeriod }}</p>
        <p class="bento-meal-card__summary">
          {{ summary.summaryText || '尚未選擇便當' }}
        </p>
      </div>

      <div class="bento-meal-card__header-side">
        <span v-if="summary.totalAmount > 0" class="bento-meal-card__amount">${{ summary.totalAmount }}</span>
        <button class="bento-meal-card__toggle" type="button" @click="emit('toggle')">
          <UpOutlined v-if="expanded" />
          <DownOutlined v-else />
        </button>
      </div>
    </div>

    <div v-if="expanded" class="bento-meal-card__body">
      <div v-for="option in card.options" :key="option.id" class="bento-meal-card__option">
        <div class="bento-meal-card__option-main">
          <div class="bento-meal-card__thumb" :style="{ background: option.thumbnailColor }">
            {{ option.thumbnailLabel }}
          </div>
          <div>
            <strong>{{ option.name }}</strong>
            <span>${{ option.price }}</span>
          </div>
        </div>

        <div class="bento-meal-card__counter">
          <button
            type="button"
            @click="emit('quantityChange', option.id, Math.max(getOptionQuantity(option, quantities) - 1, 0))"
          >
            <MinusOutlined />
          </button>
          <strong>{{ getOptionQuantity(option, quantities) }}</strong>
          <button
            type="button"
            @click="emit('quantityChange', option.id, getOptionQuantity(option, quantities) + 1)"
          >
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.bento-meal-card {
  width: 208px;
  border: 1px solid #e8ebf0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.04);
}

.bento-meal-card--lunch {
  background: #fff2be;
}

.bento-meal-card--dinner {
  background: #d9edf9;
}

.bento-meal-card--expanded {
  width: 210px;
  background: #fff;
}

.bento-meal-card--expanded.bento-meal-card--lunch {
  border: 1px solid #efe2a4;
}

.bento-meal-card--expanded.bento-meal-card--dinner {
  border: 1px solid #c9deeb;
}

.bento-meal-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
}

.bento-meal-card__header-main {
  min-width: 0;
}

.bento-meal-card__period {
  margin: 0;
  color: #1a8fff;
  font-size: 13px;
  font-weight: 700;
}

.bento-meal-card__summary {
  margin: 4px 0 0;
  color: #5c6470;
  font-size: 12px;
  line-height: 1.5;
}

.bento-meal-card__summary :deep(.count) {
  color: #ff5f5f;
}

.bento-meal-card__header-side {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.bento-meal-card__amount {
  color: #8d95a0;
  font-size: 12px;
}

.bento-meal-card__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: #9ca3af;
  cursor: pointer;
}

.bento-meal-card__body {
  border-top: 1px solid #e7eaef;
  background: #ffffff;
}

.bento-meal-card__option {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
}

.bento-meal-card__option + .bento-meal-card__option {
  border-top: 1px solid #eef1f4;
}

.bento-meal-card__option-main {
  display: flex;
  gap: 10px;
  align-items: center;
}

.bento-meal-card__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bento-meal-card__option-main strong,
.bento-meal-card__option-main span {
  display: block;
  margin: 0;
}

.bento-meal-card__option-main strong {
  color: #4b5563;
  font-size: 13px;
}

.bento-meal-card__option-main span {
  color: #7a8490;
  font-size: 12px;
}

.bento-meal-card__counter {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7b8490;
}

.bento-meal-card__counter button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.bento-meal-card__counter strong {
  font-size: 14px;
}
</style>
