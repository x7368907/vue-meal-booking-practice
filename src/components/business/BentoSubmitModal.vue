<script setup lang="ts">
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons-vue'

defineProps<{
  open: boolean
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

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="bento-submit-modal">
      <div class="bento-submit-modal__backdrop" @click="$emit('close')" />

      <section class="bento-submit-modal__panel">
        <button class="bento-submit-modal__close" type="button" @click="$emit('close')">
          <CloseOutlined />
        </button>

        <header class="bento-submit-modal__header">
          <CheckCircleFilled class="bento-submit-modal__success-icon" />
          <h2>報餐成功！</h2>
        </header>

        <div class="bento-submit-modal__list">
          <article v-for="ticket in tickets" :key="ticket.pickupCode" class="bento-submit-modal__ticket">
            <h3>取餐號碼 {{ ticket.pickupCode }}</h3>
            <p class="bento-submit-modal__meta">{{ ticket.title }}｜{{ ticket.locationLabel }}</p>

            <div class="bento-submit-modal__ticket-row">
              <p class="bento-submit-modal__meal">
                <template v-for="(item, index) in ticket.mealItems" :key="`${ticket.pickupCode}-${item.name}`">
                  <span>{{ item.name }}</span><em>x{{ item.quantity }}</em><span v-if="index < ticket.mealItems.length - 1">、</span>
                </template>
              </p>
              <strong class="bento-submit-modal__amount">${{ ticket.amount }}</strong>
            </div>

            <p class="bento-submit-modal__time">{{ ticket.dateTimeLabel }}</p>
          </article>
        </div>

        <div class="bento-submit-modal__contact">
          <span>分機或聯絡電話</span>
          <strong>{{ extension }}</strong>
        </div>

        <div class="bento-submit-modal__footer">
          <p>* 薪水給付</p>
          <div class="bento-submit-modal__prepaid">
            <span>預付金額</span>
            <strong>${{ prepaidAmount }}</strong>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.bento-submit-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
}

.bento-submit-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
}

.bento-submit-modal__panel {
  position: relative;
  z-index: 1;
  width: min(366px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 14px 14px 0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.32);
}

.bento-submit-modal__close {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #8d97a4;
  cursor: pointer;
}

.bento-submit-modal__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 28px;
  margin-bottom: 14px;
}

.bento-submit-modal__success-icon {
  color: #18c37e;
  font-size: 16px;
}

.bento-submit-modal__header h2,
.bento-submit-modal__ticket h3,
.bento-submit-modal__ticket p,
.bento-submit-modal__contact span,
.bento-submit-modal__contact strong,
.bento-submit-modal__footer p,
.bento-submit-modal__prepaid span,
.bento-submit-modal__prepaid strong {
  margin: 0;
}

.bento-submit-modal__header h2 {
  color: #202734;
  font-size: 20px;
  font-weight: 700;
}

.bento-submit-modal__list {
  display: grid;
  gap: 10px;
}

.bento-submit-modal__ticket {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f6f7f9;
}

.bento-submit-modal__ticket h3 {
  color: #2790ea;
  font-size: 16px;
  font-weight: 700;
}

.bento-submit-modal__meta {
  margin-top: 4px !important;
  color: #9aa2ae;
  font-size: 11px;
  font-weight: 600;
}

.bento-submit-modal__ticket-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.bento-submit-modal__meal {
  color: #5c6470;
  font-size: 14px;
  line-height: 1.5;
}

.bento-submit-modal__meal em {
  color: #ff5f5f;
  font-style: normal;
  font-weight: 700;
}

.bento-submit-modal__amount {
  color: #8f98a5;
  font-size: 20px;
  font-weight: 500;
}

.bento-submit-modal__time {
  margin-top: 6px !important;
  color: #8f98a5;
  font-size: 12px;
}

.bento-submit-modal__contact,
.bento-submit-modal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 2px;
}

.bento-submit-modal__contact {
  border-top: 1px solid #eef1f4;
}

.bento-submit-modal__contact span,
.bento-submit-modal__contact strong {
  color: #5d6670;
  font-size: 14px;
  font-weight: 600;
}

.bento-submit-modal__footer {
  border-top: 1px solid #eef1f4;
  margin-top: 0;
  padding-bottom: 16px;
}

.bento-submit-modal__footer p {
  color: #16c784;
  font-size: 13px;
  font-weight: 700;
}

.bento-submit-modal__prepaid {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.bento-submit-modal__prepaid span {
  color: #6d7681;
  font-size: 14px;
  font-weight: 600;
}

.bento-submit-modal__prepaid strong {
  color: #1990f0;
  font-size: 18px;
  font-weight: 700;
}
</style>
