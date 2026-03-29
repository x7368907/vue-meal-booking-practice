<script setup lang="ts">
import BookingSuccessModal from '@/components/business/BookingSuccessModal.vue'
import BentoSuccessContent from '@/components/business/BentoSuccessContent.vue'

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
  <BookingSuccessModal :open="open" @close="$emit('close')">
    <BentoSuccessContent :tickets="tickets" :extension="extension" :prepaid-amount="prepaidAmount" />
  </BookingSuccessModal>
</template>
