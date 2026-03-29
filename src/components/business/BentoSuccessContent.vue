<script setup lang="ts">
defineProps<{
  tickets: Array<{
    pickupCode: string
    title: string
    locationLabel: string
    mealItems: Array<{
      name: string
      quantity: number
    }>
    amount: number
    dateTimeLabel: string
  }>
  extension: string
  prepaidAmount: number
}>()
</script>

<template>
  <div class="bento-success-content">
    <article v-for="ticket in tickets" :key="ticket.pickupCode" class="bento-success-content__ticket">
      <h3>取餐號碼 {{ ticket.pickupCode }}</h3>
      <p class="bento-success-content__meta">{{ ticket.title }}｜{{ ticket.locationLabel }}</p>

      <div class="bento-success-content__ticket-row">
        <p class="bento-success-content__meal">
          <template v-for="(item, index) in ticket.mealItems" :key="`${ticket.pickupCode}-${item.name}`">
            <span>{{ item.name }}</span><em>x{{ item.quantity }}</em><span v-if="index < ticket.mealItems.length - 1">、</span>
          </template>
        </p>
        <strong class="bento-success-content__amount">${{ ticket.amount }}</strong>
      </div>

      <p class="bento-success-content__time">{{ ticket.dateTimeLabel }}</p>
    </article>

    <div class="bento-success-content__contact">
      <span>分機或聯絡電話</span>
      <strong>{{ extension }}</strong>
    </div>

    <div class="bento-success-content__footer">
      <p>* 薪水給付</p>
      <div class="bento-success-content__prepaid">
        <span>預付金額</span>
        <strong>${{ prepaidAmount }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bento-success-content {
  display: grid;
  gap: 10px;
}

.bento-success-content__ticket {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f6f7f9;
}

.bento-success-content__ticket h3,
.bento-success-content__ticket p,
.bento-success-content__contact span,
.bento-success-content__contact strong,
.bento-success-content__footer p,
.bento-success-content__prepaid span,
.bento-success-content__prepaid strong {
  margin: 0;
}

.bento-success-content__ticket h3 {
  color: #2790ea;
  font-size: 16px;
  font-weight: 700;
}

.bento-success-content__meta {
  margin-top: 4px !important;
  color: #9aa2ae;
  font-size: 11px;
  font-weight: 600;
}

.bento-success-content__ticket-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.bento-success-content__meal {
  color: #5c6470;
  font-size: 14px;
  line-height: 1.5;
}

.bento-success-content__meal em {
  color: #ff5f5f;
  font-style: normal;
  font-weight: 700;
}

.bento-success-content__amount {
  color: #8f98a5;
  font-size: 20px;
  font-weight: 500;
}

.bento-success-content__time {
  margin-top: 6px !important;
  color: #8f98a5;
  font-size: 12px;
}

.bento-success-content__contact,
.bento-success-content__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 2px;
}

.bento-success-content__contact {
  border-top: 1px solid #eef1f4;
}

.bento-success-content__contact span,
.bento-success-content__contact strong {
  color: #5d6670;
  font-size: 14px;
  font-weight: 600;
}

.bento-success-content__footer {
  border-top: 1px solid #eef1f4;
}

.bento-success-content__footer p {
  color: #16c784;
  font-size: 13px;
  font-weight: 700;
}

.bento-success-content__prepaid {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.bento-success-content__prepaid span {
  color: #6d7681;
  font-size: 14px;
  font-weight: 600;
}

.bento-success-content__prepaid strong {
  color: #1990f0;
  font-size: 18px;
  font-weight: 700;
}
</style>
