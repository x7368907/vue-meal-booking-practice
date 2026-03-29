<script setup lang="ts">
import BookingSuccessModal from '@/components/business/BookingSuccessModal.vue'
import SetMealSuccessContent from '@/components/business/SetMealSuccessContent.vue'

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
  <BookingSuccessModal :open="open" @close="$emit('close')">
    <SetMealSuccessContent :ticket="ticket" :extension="extension" :prepaid-amount="prepaidAmount" />
  </BookingSuccessModal>
</template>
