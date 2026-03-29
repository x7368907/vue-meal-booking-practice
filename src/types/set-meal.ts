export interface SetMealLocationOption {
  label: string
  value: string
}

export interface SetMealPeriodOption {
  label: string
  value: string
}

export interface SetMealCustomizationOption {
  label: string
  value: string
}

export interface SetMealCustomizationConfig {
  excludes?: SetMealCustomizationOption[]
  drinks?: SetMealCustomizationOption[]
  sugarLevels?: SetMealCustomizationOption[]
  iceLevels?: SetMealCustomizationOption[]
}

export interface SetMealCustomizationState {
  excludes: string[]
  drink: string
  sugarLevel: string
  iceLevel: string
}

export interface SetMealCardOptionGroup {
  id: string
  title: string
  value: string
}

export interface SetMealCardItem {
  id: string
  name: string
  price: number
  imageLabel: string
  imageColor: string
  optionGroups?: SetMealCardOptionGroup[]
  customizationConfig?: SetMealCustomizationConfig
}

export interface SetMealPageResponse {
  locationOptions: SetMealLocationOption[]
  periodOptions: SetMealPeriodOption[]
  defaultLocation: string
  defaultDiningDate: string
  defaultPeriod: string
  defaultPickupTime: string
  defaultExtension: string
  cards: SetMealCardItem[]
}

export interface SetMealSubmitTicket {
  pickupCode: string
  title: string
  locationLabel: string
  dateTimeLabel: string
  items: Array<{
    name: string
    customizationSummary: string[]
    amount: number
  }>
}
