export type BentoCardTone = 'lunch' | 'dinner'

export interface BentoLocationOption {
  label: string
  value: string
}

export interface BentoMealOption {
  id: string
  name: string
  price: number
  thumbnailLabel: string
  thumbnailColor: string
}

export interface BentoMealCard {
  id: string
  mealPeriod: string
  tone: BentoCardTone
  options: BentoMealOption[]
  isExpandedByDefault?: boolean
}

export interface BentoDateSection {
  id: string
  date: string
  displayDate: string
  status: 'unpublished' | 'available' | 'suspended'
  message?: string
  notices?: string[]
  cards: BentoMealCard[]
}

export interface BentoPageResponse {
  locationOptions: BentoLocationOption[]
  defaultLocation: string
  defaultDiningDate: string
  defaultExtension: string
  cutoffLines: string[]
  sections: BentoDateSection[]
}

export interface BentoPickupTicket {
  pickupCode: string
  title: string
  locationLabel: string
  mealItems: Array<{
    name: string
    quantity: number
  }>
  amount: number
  dateTimeLabel: string
}
