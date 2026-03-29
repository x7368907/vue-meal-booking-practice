<script setup lang="ts">
import BookingSuccessModal from '@/components/business/BookingSuccessModal.vue'
import BuffetSuccessContent from '@/components/business/BuffetSuccessContent.vue'

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
  <BookingSuccessModal :open="open" @close="$emit('close')">
    <BuffetSuccessContent :tickets="tickets" />
  </BookingSuccessModal>
</template>
