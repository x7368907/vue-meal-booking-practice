<script setup lang="ts">
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons-vue'

defineProps<{
  open: boolean
  title?: string
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="booking-success-modal">
      <div class="booking-success-modal__backdrop" @click="$emit('close')" />

      <section class="booking-success-modal__panel">
        <button class="booking-success-modal__close" type="button" @click="$emit('close')">
          <CloseOutlined />
        </button>

        <header class="booking-success-modal__header">
          <CheckCircleFilled class="booking-success-modal__success-icon" />
          <h2>{{ title ?? '報餐成功！' }}</h2>
        </header>

        <div class="booking-success-modal__body">
          <slot />
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.booking-success-modal {
  position: fixed;
  inset: 0;
  z-index: 2300;
  display: grid;
  place-items: center;
}

.booking-success-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.68);
}

.booking-success-modal__panel {
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

.booking-success-modal__close {
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

.booking-success-modal__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 28px;
  margin-bottom: 14px;
}

.booking-success-modal__success-icon {
  color: #18c37e;
  font-size: 16px;
}

.booking-success-modal__header h2 {
  margin: 0;
  color: #202734;
  font-size: 20px;
  font-weight: 700;
}

.booking-success-modal__body {
  padding-bottom: 16px;
}
</style>
