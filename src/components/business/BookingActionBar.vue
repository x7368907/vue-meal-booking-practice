<script setup lang="ts">
defineProps<{
  disabled?: boolean
  submitting?: boolean
}>()

defineEmits<{
  submit: []
  reset: []
}>()
</script>

<template>
  <div class="booking-action-bar">
    <p>目前以 mock submit 模擬送單流程，之後可替換為正式報餐 API。</p>

    <div class="booking-action-bar__buttons">
      <a-button :disabled="submitting" @click="$emit('reset')">重設</a-button>
      <a-button type="primary" :disabled="disabled" :loading="submitting" @click="$emit('submit')">
        提交報餐
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.booking-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.booking-action-bar p {
  margin: 0;
  color: var(--color-text-soft);
}

.booking-action-bar__buttons {
  display: flex;
  gap: 12px;
}

@media (max-width: 760px) {
  .booking-action-bar,
  .booking-action-bar__buttons {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
