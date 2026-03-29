<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    location: string
    diningDate: string
    period: string
    pickupTime: string
  }
  locationOptions: Array<{ label: string; value: string }>
  periodOptions: Array<{ label: string; value: string }>
  noticeText: string
}>()

const emit = defineEmits<{
  'update:modelValue': [
    value: {
      location: string
      diningDate: string
      period: string
      pickupTime: string
    },
  ]
  search: []
}>()
</script>

<template>
  <section class="set-meal-filter-panel">
    <div class="set-meal-filter-panel__layout">
      <div class="set-meal-filter-panel__content">
        <div class="set-meal-filter-panel__fields">
          <div class="set-meal-filter-panel__field-group">
            <label class="set-meal-filter-panel__label">用餐地點</label>
            <a-select
              :value="props.modelValue.location"
              :options="props.locationOptions"
              class="set-meal-filter-panel__control"
              @update:value="emit('update:modelValue', { ...props.modelValue, location: $event })"
            />
          </div>

          <div class="set-meal-filter-panel__field-group">
            <label class="set-meal-filter-panel__label">用餐日期</label>
            <input
              class="set-meal-filter-panel__date-input"
              type="date"
              :value="props.modelValue.diningDate"
              @input="emit('update:modelValue', { ...props.modelValue, diningDate: ($event.target as HTMLInputElement).value })"
            />
          </div>

          <div class="set-meal-filter-panel__field-group">
            <label class="set-meal-filter-panel__label">時段</label>
            <a-select
              :value="props.modelValue.period"
              :options="props.periodOptions"
              class="set-meal-filter-panel__period-control"
              @update:value="emit('update:modelValue', { ...props.modelValue, period: $event })"
            />
          </div>

          <div class="set-meal-filter-panel__field-group">
            <label class="set-meal-filter-panel__label">取餐時間</label>
            <input
              class="set-meal-filter-panel__time-input"
              type="time"
              :value="props.modelValue.pickupTime"
              @input="emit('update:modelValue', { ...props.modelValue, pickupTime: ($event.target as HTMLInputElement).value })"
            />
          </div>
        </div>

        <p class="set-meal-filter-panel__notice">{{ props.noticeText }}</p>
      </div>

      <div class="set-meal-filter-panel__action">
        <a-button class="set-meal-filter-panel__search-btn" @click="emit('search')">搜尋</a-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.set-meal-filter-panel {
  padding: 16px 16px 14px;
  border: 1px solid #eceef2;
  border-radius: 8px;
  background: #ffffff;
}

.set-meal-filter-panel__layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
}

.set-meal-filter-panel__content {
  flex: 1;
  min-width: 0;
}

.set-meal-filter-panel__fields {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.set-meal-filter-panel__field-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.set-meal-filter-panel__label {
  color: #59636e;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.set-meal-filter-panel__control {
  width: 128px;
}

.set-meal-filter-panel__period-control,
.set-meal-filter-panel__time-input,
.set-meal-filter-panel__date-input {
  width: 132px;
}

.set-meal-filter-panel :deep(.ant-select-selector) {
  height: 32px !important;
  padding: 0 10px !important;
  border: 1px solid #dfe5ec !important;
  border-radius: 6px !important;
  background: #eef5fb !important;
  box-shadow: none !important;
}

.set-meal-filter-panel__date-input,
.set-meal-filter-panel__time-input {
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dfe5ec;
  border-radius: 6px;
  background: #eef5fb;
  color: #46515c;
  font-size: 13px;
}

.set-meal-filter-panel__notice {
  margin: 12px 0 0;
  color: #7a8590;
  font-size: 12px;
  font-weight: 600;
}

.set-meal-filter-panel__search-btn {
  height: 32px;
  min-width: 58px;
  padding: 0 14px;
  border-color: #6ebcff;
  border-radius: 8px;
  background: #ffffff;
  color: #1890ff;
  font-size: 13px;
  font-weight: 600;
}
</style>
