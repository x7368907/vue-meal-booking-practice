<script setup lang="ts">
import BentoMealCard from '@/components/business/BentoMealCard.vue'
import type { BentoDateSection as BentoDateSectionType } from '@/types/bento'

defineProps<{
  section: BentoDateSectionType
  quantities: Record<string, number>
  expandedCardIds: string[]
}>()

const emit = defineEmits<{
  toggle: [cardId: string]
  quantityChange: [optionId: string, quantity: number]
}>()

const handleQuantityChange = (optionId: string, quantity: number) => {
  emit('quantityChange', optionId, quantity)
}
</script>

<template>
  <section class="bento-date-section">
    <h2>{{ section.displayDate }}</h2>

    <div v-if="section.notices?.length" class="bento-date-section__notices">
      <p>{{ section.notices.join('｜') }}</p>
    </div>

    <p v-if="section.status === 'unpublished'" class="bento-date-section__message">
      {{ section.message }}
    </p>

    <div v-if="section.cards.length" class="bento-date-section__cards">
      <BentoMealCard
        v-for="card in section.cards"
        :key="card.id"
        :card="card"
        :quantities="quantities"
        :expanded="expandedCardIds.includes(card.id)"
        @toggle="emit('toggle', card.id)"
        @quantity-change="handleQuantityChange"
      />
    </div>
  </section>
</template>

<style scoped>
.bento-date-section {
  padding: 20px 0 16px;
  border-bottom: 1px solid #d8dce3;
}

.bento-date-section h2 {
  margin: 0 0 10px;
  color: #1890ff;
  font-size: 16px;
  font-weight: 700;
}

.bento-date-section__notices p,
.bento-date-section__message {
  margin: 0;
  color: #6d7681;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.75;
}

.bento-date-section__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 10px;
}
</style>
