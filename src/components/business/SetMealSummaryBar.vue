<script setup lang="ts">
defineProps<{
  amount: number
  extension: string
  disabled?: boolean
  submitting?: boolean
}>()

defineEmits<{
  'update:extension': [value: string]
  submit: []
}>()
</script>

<template>
  <div class="set-meal-summary-bar">
    <div class="set-meal-summary-bar__amount">
      <span>預付金額</span>
      <strong>${{ amount }}</strong>
    </div>

    <div class="set-meal-summary-bar__actions">
      <label class="set-meal-summary-bar__label">
        <span>*</span>分機或聯絡電話
      </label>
      <input
        class="set-meal-summary-bar__input"
        :value="extension"
        @input="$emit('update:extension', ($event.target as HTMLInputElement).value)"
      />
      <a-button
        class="set-meal-summary-bar__submit-btn"
        type="primary"
        :disabled="disabled"
        :loading="submitting"
        @click="$emit('submit')"
      >
        送出報餐
      </a-button>
    </div>
  </div>
</template>

<style scoped>
.set-meal-summary-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 14px 0 10px;
}

.set-meal-summary-bar__amount {
  display: flex;
  align-items: baseline;
  gap: 6px;
  color: #1a8fff;
}

.set-meal-summary-bar__amount span {
  font-size: 13px;
  font-weight: 600;
}

.set-meal-summary-bar__amount strong {
  font-size: 18px;
}

.set-meal-summary-bar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.set-meal-summary-bar__label {
  color: #5c6570;
  font-size: 12px;
  font-weight: 600;
}

.set-meal-summary-bar__label span {
  color: #ff4d4f;
}

.set-meal-summary-bar__input {
  width: 108px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid #d6dbe3;
  border-radius: 6px;
  background: #ffffff;
  color: #44505c;
}

.set-meal-summary-bar__submit-btn {
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 7px;
  background: #10c98b;
  box-shadow: none;
  font-size: 13px;
  font-weight: 600;
}

.set-meal-summary-bar__submit-btn[disabled],
.set-meal-summary-bar__submit-btn:disabled {
  background: #dbece5 !important;
  color: #ffffff !important;
  cursor: not-allowed !important;
}
</style>
