<script setup lang="ts">
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons-vue'

import type { SetMealSubmitTicket } from '@/types/set-meal'

defineProps<{
  open: boolean
  ticket: SetMealSubmitTicket | null
  extension: string
  prepaidAmount: number
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open && ticket" class="set-meal-submit-modal">
      <div class="set-meal-submit-modal__backdrop" @click="$emit('close')" />

      <section class="set-meal-submit-modal__panel">
        <button class="set-meal-submit-modal__close" type="button" @click="$emit('close')">
          <CloseOutlined />
        </button>

        <header class="set-meal-submit-modal__header">
          <CheckCircleFilled class="set-meal-submit-modal__success-icon" />
          <h2>報餐成功！</h2>
        </header>

        <article class="set-meal-submit-modal__pickup-card">
          <h3>取餐號碼 {{ ticket.pickupCode }}</h3>
          <p class="set-meal-submit-modal__meta">{{ ticket.title }}｜{{ ticket.locationLabel }}</p>
          <p class="set-meal-submit-modal__time">{{ ticket.dateTimeLabel }}</p>
        </article>

        <div class="set-meal-submit-modal__list">
          <article v-for="item in ticket.items" :key="item.name" class="set-meal-submit-modal__item-card">
            <div class="set-meal-submit-modal__item-top">
              <strong>{{ item.name }}</strong>
              <span>${{ item.amount }}</span>
            </div>

            <div v-if="item.customizationSummary.length > 0" class="set-meal-submit-modal__summary">
              <p v-for="line in item.customizationSummary" :key="`${item.name}-${line}`">{{ line }}</p>
            </div>
          </article>
        </div>

        <div class="set-meal-submit-modal__contact">
          <span>分機或聯絡電話</span>
          <strong>{{ extension }}</strong>
        </div>

        <div class="set-meal-submit-modal__footer">
          <p>* 薪水給付</p>
          <div class="set-meal-submit-modal__prepaid">
            <span>預付金額</span>
            <strong>${{ prepaidAmount }}</strong>
          </div>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.set-meal-submit-modal {
  position: fixed;
  inset: 0;
  z-index: 2300;
  display: grid;
  place-items: center;
}

.set-meal-submit-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
}

.set-meal-submit-modal__panel {
  position: relative;
  z-index: 1;
  width: min(366px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 14px 14px 0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.3);
}

.set-meal-submit-modal__close {
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

.set-meal-submit-modal__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 28px;
  margin-bottom: 14px;
}

.set-meal-submit-modal__success-icon {
  color: #18c37e;
  font-size: 16px;
}

.set-meal-submit-modal__header h2,
.set-meal-submit-modal__pickup-card h3,
.set-meal-submit-modal__pickup-card p,
.set-meal-submit-modal__item-card p,
.set-meal-submit-modal__item-card strong,
.set-meal-submit-modal__item-card span,
.set-meal-submit-modal__contact span,
.set-meal-submit-modal__contact strong,
.set-meal-submit-modal__footer p,
.set-meal-submit-modal__prepaid span,
.set-meal-submit-modal__prepaid strong {
  margin: 0;
}

.set-meal-submit-modal__header h2 {
  color: #202734;
  font-size: 20px;
  font-weight: 700;
}

.set-meal-submit-modal__pickup-card,
.set-meal-submit-modal__item-card {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f6f7f9;
}

.set-meal-submit-modal__pickup-card h3 {
  color: #2790ea;
  font-size: 16px;
  font-weight: 700;
}

.set-meal-submit-modal__meta {
  margin-top: 4px !important;
  color: #9aa2ae;
  font-size: 11px;
  font-weight: 600;
}

.set-meal-submit-modal__time {
  margin-top: 6px !important;
  color: #8f98a5;
  font-size: 12px;
}

.set-meal-submit-modal__list {
  display: grid;
  gap: 10px;
  margin-top: 10px;
}

.set-meal-submit-modal__item-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.set-meal-submit-modal__item-top strong {
  color: #374151;
  font-size: 15px;
  font-weight: 700;
}

.set-meal-submit-modal__item-top span {
  color: #7f8995;
  font-size: 18px;
  font-weight: 500;
}

.set-meal-submit-modal__summary {
  margin-top: 8px;
}

.set-meal-submit-modal__summary p {
  color: #727b87;
  font-size: 12px;
  line-height: 1.6;
}

.set-meal-submit-modal__contact,
.set-meal-submit-modal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 2px;
}

.set-meal-submit-modal__contact {
  border-top: 1px solid #eef1f4;
  margin-top: 12px;
}

.set-meal-submit-modal__contact span,
.set-meal-submit-modal__contact strong {
  color: #5d6670;
  font-size: 14px;
  font-weight: 600;
}

.set-meal-submit-modal__footer {
  border-top: 1px solid #eef1f4;
  padding-bottom: 16px;
}

.set-meal-submit-modal__footer p {
  color: #16c784;
  font-size: 13px;
  font-weight: 700;
}

.set-meal-submit-modal__prepaid {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.set-meal-submit-modal__prepaid span {
  color: #6d7681;
  font-size: 14px;
  font-weight: 600;
}

.set-meal-submit-modal__prepaid strong {
  color: #1990f0;
  font-size: 18px;
  font-weight: 700;
}
</style>
