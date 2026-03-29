<script setup lang="ts">
defineProps<{
  tickets: Array<{
    pickupCode: string
    title: string
    locationLabel: string
    mealName: string
    quantity: number
    dateTimeLabel: string
  }>
}>()
</script>

<template>
  <div class="buffet-success-content">
    <article v-for="ticket in tickets" :key="ticket.pickupCode" class="buffet-success-content__ticket">
      <h3>取餐號碼 {{ ticket.pickupCode }}</h3>
      <p class="buffet-success-content__meta">{{ ticket.title }}｜{{ ticket.locationLabel }}</p>
      <p class="buffet-success-content__meal">
        {{ ticket.mealName }}<span>x{{ ticket.quantity }}</span>
      </p>
      <p class="buffet-success-content__time">{{ ticket.dateTimeLabel }}</p>
    </article>
  </div>
</template>

<style scoped>
.buffet-success-content {
  display: grid;
  gap: 10px;
}

.buffet-success-content__ticket {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f6f7f9;
}

.buffet-success-content__ticket h3,
.buffet-success-content__ticket p {
  margin: 0;
}

.buffet-success-content__ticket h3 {
  color: #2790ea;
  font-size: 16px;
  font-weight: 700;
}

.buffet-success-content__meta {
  margin-top: 4px !important;
  color: #9aa2ae;
  font-size: 11px;
  font-weight: 600;
}

.buffet-success-content__meal {
  margin-top: 8px !important;
  color: #5c6470;
  font-size: 14px;
  line-height: 1.5;
}

.buffet-success-content__meal span {
  margin-left: 1px;
  color: #ff5f5f;
  font-weight: 700;
}

.buffet-success-content__time {
  margin-top: 6px !important;
  color: #8f98a5;
  font-size: 12px;
}
</style>
