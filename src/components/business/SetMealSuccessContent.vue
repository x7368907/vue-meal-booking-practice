<script setup lang="ts">
import type { SetMealSubmitTicket } from '@/types/set-meal'

defineProps<{
  ticket: SetMealSubmitTicket | null
  extension: string
  prepaidAmount: number
}>()
</script>

<template>
  <div v-if="ticket" class="set-meal-success-content">
    <article class="set-meal-success-content__pickup-card">
      <h3>取餐號碼 {{ ticket.pickupCode }}</h3>
      <p class="set-meal-success-content__meta">{{ ticket.title }}｜{{ ticket.locationLabel }}</p>
      <p class="set-meal-success-content__time">{{ ticket.dateTimeLabel }}</p>
    </article>

    <div class="set-meal-success-content__list">
      <article v-for="item in ticket.items" :key="item.name" class="set-meal-success-content__item-card">
        <div class="set-meal-success-content__item-top">
          <strong>{{ item.name }}</strong>
          <span>${{ item.amount }}</span>
        </div>

        <div v-if="item.customizationSummary.length > 0" class="set-meal-success-content__summary">
          <p v-for="line in item.customizationSummary" :key="`${item.name}-${line}`">{{ line }}</p>
        </div>
      </article>
    </div>

    <div class="set-meal-success-content__contact">
      <span>分機或聯絡電話</span>
      <strong>{{ extension }}</strong>
    </div>

    <div class="set-meal-success-content__footer">
      <p>* 薪水給付</p>
      <div class="set-meal-success-content__prepaid">
        <span>預付金額</span>
        <strong>${{ prepaidAmount }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.set-meal-success-content__pickup-card,
.set-meal-success-content__item-card {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f6f7f9;
}

.set-meal-success-content__pickup-card h3,
.set-meal-success-content__pickup-card p,
.set-meal-success-content__item-card p,
.set-meal-success-content__item-card strong,
.set-meal-success-content__item-card span,
.set-meal-success-content__contact span,
.set-meal-success-content__contact strong,
.set-meal-success-content__footer p,
.set-meal-success-content__prepaid span,
.set-meal-success-content__prepaid strong {
  margin: 0;
}

.set-meal-success-content__pickup-card h3 {
  color: #2790ea;
  font-size: 16px;
  font-weight: 700;
}

.set-meal-success-content__meta {
  margin-top: 4px !important;
  color: #9aa2ae;
  font-size: 11px;
  font-weight: 600;
}

.set-meal-success-content__time {
  margin-top: 6px !important;
  color: #8f98a5;
  font-size: 12px;
}

.set-meal-success-content__list {
  display: grid;
  gap: 10px;
  margin-top: 10px;
}

.set-meal-success-content__item-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.set-meal-success-content__item-top strong {
  color: #374151;
  font-size: 15px;
  font-weight: 700;
}

.set-meal-success-content__item-top span {
  color: #7f8995;
  font-size: 18px;
  font-weight: 500;
}

.set-meal-success-content__summary {
  margin-top: 8px;
}

.set-meal-success-content__summary p {
  color: #727b87;
  font-size: 12px;
  line-height: 1.6;
}

.set-meal-success-content__contact,
.set-meal-success-content__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 2px;
}

.set-meal-success-content__contact {
  border-top: 1px solid #eef1f4;
  margin-top: 12px;
}

.set-meal-success-content__contact span,
.set-meal-success-content__contact strong {
  color: #5d6670;
  font-size: 14px;
  font-weight: 600;
}

.set-meal-success-content__footer {
  border-top: 1px solid #eef1f4;
}

.set-meal-success-content__footer p {
  color: #16c784;
  font-size: 13px;
  font-weight: 700;
}

.set-meal-success-content__prepaid {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.set-meal-success-content__prepaid span {
  color: #6d7681;
  font-size: 14px;
  font-weight: 600;
}

.set-meal-success-content__prepaid strong {
  color: #1990f0;
  font-size: 18px;
  font-weight: 700;
}
</style>
