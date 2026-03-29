<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    location: string
    diningDate: string
  }
  locationOptions: Array<{
    label: string
    value: string
  }>
  cutoffTitle: string
  cutoffLines: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { location: string; diningDate: string }]
  search: []
}>()
</script>

<template>
  <section class="buffet-filter-panel">
    <div class="buffet-filter-panel__layout">
      <div class="buffet-filter-panel__content">
        <div class="buffet-filter-panel__fields">
          <div class="buffet-filter-panel__field-group">
            <label class="buffet-filter-panel__label">用餐地點</label>
            <a-select
              :value="props.modelValue.location"
              :options="props.locationOptions"
              class="buffet-filter-panel__control"
              placeholder="請選擇用餐地點"
              @update:value="
                emit('update:modelValue', {
                  ...props.modelValue,
                  location: $event,
                })
              "
            />
          </div>

          <div class="buffet-filter-panel__field-group">
            <label class="buffet-filter-panel__label">用餐日期</label>
            <input
              class="buffet-filter-panel__date-input"
              type="date"
              :value="props.modelValue.diningDate"
              @input="
                emit('update:modelValue', {
                  ...props.modelValue,
                  diningDate: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>
        </div>

        <div class="buffet-filter-panel__cutoff">
          <p>{{ props.cutoffTitle }}</p>
          <span>{{ props.cutoffLines.join('｜') }}</span>
        </div>
      </div>

      <div class="buffet-filter-panel__action">
        <a-button class="buffet-filter-panel__search-btn" @click="emit('search')"> 搜尋 </a-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.buffet-filter-panel {
  padding: 14px 16px 12px;
  border: 1px solid #eceef2;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.02);
}

.buffet-filter-panel__layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.buffet-filter-panel__content {
  flex: 1;
  min-width: 0;
}

.buffet-filter-panel__fields {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.buffet-filter-panel__field-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.buffet-filter-panel__label {
  color: #59636e;
  font-size: 12px;
  font-weight: 600;
  line-height: 32px;
  white-space: nowrap;
}

.buffet-filter-panel__control {
  width: 178px;
}

.buffet-filter-panel__action {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: end;
  min-width: 70px;
}

.buffet-filter-panel :deep(.ant-select) {
  display: inline-block;
}

.buffet-filter-panel :deep(.ant-select-selector) {
  height: 32px !important;
  padding: 0 10px !important;
  border: 1px solid #dfe5ec !important;
  border-radius: 6px !important;
  background: #eef5fb !important;
  box-shadow: none !important;
}

.buffet-filter-panel :deep(.ant-select-selection-wrap) {
  align-items: center;
}

.buffet-filter-panel :deep(.ant-select-selection-item) {
  color: #46515c;
  font-size: 13px;
  line-height: 30px !important;
}

.buffet-filter-panel :deep(.ant-select-arrow) {
  color: #7b8794;
}

.buffet-filter-panel__date-input {
  width: 156px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dfe5ec;
  border-radius: 6px;
  background: #eef5fb;
  color: #46515c;
  font-size: 13px;
  line-height: 32px;
}

.buffet-filter-panel__search-btn {
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

.buffet-filter-panel__search-btn :deep(span) {
  line-height: 1;
}

.buffet-filter-panel__cutoff {
  margin-top: 12px;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.65;
}

.buffet-filter-panel__cutoff p,
.buffet-filter-panel__cutoff span {
  margin: 0;
}

.buffet-filter-panel__cutoff p {
  margin-bottom: 2px;
  color: #5d6670;
  font-weight: 600;
}

.buffet-filter-panel__cutoff span {
  color: #7f8994;
}

@media (max-width: 900px) {
  .buffet-filter-panel__layout {
    flex-direction: column;
    align-items: stretch;
  }

  .buffet-filter-panel__fields {
    align-items: flex-start;
    flex-direction: column;
  }

  .buffet-filter-panel__action {
    align-self: flex-end;
  }
}
</style>
