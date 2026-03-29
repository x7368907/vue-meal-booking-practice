import type { MealType } from '@/types/meal'

export interface BookingContactForm {
  contactName: string
  department: string
  diningDate: string
  note: string
}

export interface BookingSummaryItem {
  mealId: string
  mealName: string
  quantity: number
  subtotal: number
}

export interface BookingSummary {
  totalQuantity: number
  totalAmount: number
  items: BookingSummaryItem[]
}

export interface BookingSubmitPayload {
  mealType: MealType
  contact: BookingContactForm
  selections: Array<{
    mealId: string
    quantity: number
  }>
}

export interface BookingSubmitResult {
  referenceNo: string
  submittedAt: string
  status: 'submitted'
}
