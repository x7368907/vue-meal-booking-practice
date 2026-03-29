<script setup lang="ts">
import type { BookingContactForm } from '@/types/booking'

const props = defineProps<{
  modelValue: BookingContactForm
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BookingContactForm]
}>()

const updateField = <K extends keyof BookingContactForm>(key: K, value: BookingContactForm[K]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  })
}
</script>

<template>
  <a-form layout="vertical">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="聯絡人">
          <a-input
            :value="modelValue.contactName"
            placeholder="請輸入聯絡人姓名"
            @update:value="updateField('contactName', $event)"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item label="部門 / 團隊">
          <a-input
            :value="modelValue.department"
            placeholder="例如：Design Team"
            @update:value="updateField('department', $event)"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item label="用餐日期">
          <a-input
            :value="modelValue.diningDate"
            placeholder="YYYY-MM-DD"
            @update:value="updateField('diningDate', $event)"
          />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="備註">
          <a-textarea
            :value="modelValue.note"
            :rows="4"
            placeholder="可輸入過敏資訊、會議室地點或特殊需求"
            @update:value="updateField('note', $event)"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
