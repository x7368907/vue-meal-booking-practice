<script setup lang="ts">
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons-vue'

defineProps<{
  open: boolean
  tickets: Array<{
    pickupCode: string
    title: string
    locationLabel: string
    mealName: string
    quantity: number
    dateTimeLabel: string
  }>
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="buffet-submit-modal">
      <div class="buffet-submit-modal__backdrop" @click="$emit('close')" />

      <section class="buffet-submit-modal__panel">
        <button class="buffet-submit-modal__close" type="button" @click="$emit('close')">
          <CloseOutlined />
        </button>

        <header class="buffet-submit-modal__header">
          <CheckCircleFilled class="buffet-submit-modal__success-icon" />
          <h2>報餐成功！</h2>
        </header>

        <div class="buffet-submit-modal__list">
          <article
            v-for="ticket in tickets"
            :key="ticket.pickupCode"
            class="buffet-submit-modal__ticket"
          >
            <h3>取餐號碼 {{ ticket.pickupCode }}</h3>
            <p class="buffet-submit-modal__meta">{{ ticket.title }}｜{{ ticket.locationLabel }}</p>
            <p class="buffet-submit-modal__meal">
              {{ ticket.mealName }}<span>x{{ ticket.quantity }}</span>
            </p>
            <p class="buffet-submit-modal__time">{{ ticket.dateTimeLabel }}</p>
          </article>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.buffet-submit-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
}

.buffet-submit-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
}

.buffet-submit-modal__panel {
  position: relative;
  z-index: 1;
  width: min(364px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 14px 14px 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.32);
}

.buffet-submit-modal__close {
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

.buffet-submit-modal__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 28px;
  margin-bottom: 14px;
}

.buffet-submit-modal__success-icon {
  color: #16c784;
  font-size: 16px;
}

.buffet-submit-modal__header h2,
.buffet-submit-modal__ticket h3,
.buffet-submit-modal__ticket p {
  margin: 0;
}

.buffet-submit-modal__header h2 {
  color: #202734;
  font-size: 20px;
  font-weight: 700;
}

.buffet-submit-modal__list {
  display: grid;
  gap: 10px;
}

.buffet-submit-modal__ticket {
  padding: 12px 14px;
  border-radius: 12px;
  background: #f6f7f9;
}

.buffet-submit-modal__ticket h3 {
  color: #2790ea;
  font-size: 16px;
  font-weight: 700;
}

.buffet-submit-modal__meta {
  margin-top: 4px !important;
  color: #9aa2ae;
  font-size: 11px;
  font-weight: 600;
}

.buffet-submit-modal__meal {
  margin-top: 8px !important;
  color: #5c6470;
  font-size: 14px;
  line-height: 1.5;
}

.buffet-submit-modal__meal span {
  margin-left: 1px;
  color: #ff5f5f;
  font-weight: 700;
}

.buffet-submit-modal__time {
  margin-top: 6px !important;
  color: #8f98a5;
  font-size: 12px;
}
</style>
