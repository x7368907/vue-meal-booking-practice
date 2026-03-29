<script setup lang="ts">
import type { BookingSubmitResult, BookingSummary } from '@/types/booking'
import { formatCurrency } from '@/utils/format.util'

defineProps<{
  summary: BookingSummary
  submissionResult?: BookingSubmitResult | null
}>()
</script>

<template>
  <div class="meal-summary">
    <div class="meal-summary__stats">
      <div>
        <span>總份數</span>
        <strong>{{ summary.totalQuantity }}</strong>
      </div>
      <div>
        <span>預估總額</span>
        <strong>{{ formatCurrency(summary.totalAmount) }}</strong>
      </div>
    </div>

    <a-empty v-if="summary.items.length === 0" description="尚未選擇餐點" />

    <a-list v-else :data-source="summary.items" size="small">
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="meal-summary__item">
            <strong>{{ item.mealName }}</strong>
            <span>{{ item.quantity }} 份</span>
          </div>
          <span>{{ formatCurrency(item.subtotal) }}</span>
        </a-list-item>
      </template>
    </a-list>

    <a-alert
      v-if="submissionResult"
      type="success"
      show-icon
      :message="`已模擬送出，單號 ${submissionResult.referenceNo}`"
      :description="`Submitted at ${submissionResult.submittedAt}`"
    />
  </div>
</template>

<style scoped>
.meal-summary {
  display: grid;
  gap: 16px;
}

.meal-summary__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.meal-summary__stats div {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
}

.meal-summary__stats span {
  color: var(--color-text-soft);
  font-size: 13px;
}

.meal-summary__stats strong {
  font-size: 22px;
}

.meal-summary__item {
  display: grid;
}

@media (max-width: 760px) {
  .meal-summary__stats {
    grid-template-columns: 1fr;
  }
}
</style>
