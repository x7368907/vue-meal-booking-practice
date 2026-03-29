export type BuffetCardTone = 'lunch' | 'tea' | 'dinner'

export interface BuffetLocationOption {
  label: string
  value: string
}

export interface BuffetMealItem {
  id: string
  name: string
  description: string
  price: number
  quantityLimit: number
  tone: BuffetCardTone
  mealPeriod: string
  dateLabel: string
  timeRange: string
}

export interface BuffetDateNotice {
  mealPeriod: string
  message: string
}

export interface BuffetDateSection {
  id: string
  date: string
  displayDate: string
  status: 'unpublished' | 'available' | 'suspended'
  message?: string
  meals: BuffetMealItem[]
  notices?: BuffetDateNotice[]
}

export interface BuffetPageResponse {
  locationOptions: BuffetLocationOption[]
  defaultLocation: string
  defaultDiningDate: string
  cutoffLines: string[]
  sections: BuffetDateSection[]
}

export interface BuffetPickupTicket {
  pickupCode: string
  title: string
  locationLabel: string
  mealName: string
  quantity: number
  dateTimeLabel: string
}
