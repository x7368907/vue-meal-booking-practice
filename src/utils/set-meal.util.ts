import type {
  SetMealCardItem,
  SetMealCustomizationConfig,
  SetMealCustomizationState,
  SetMealSubmitTicket,
} from '@/types/set-meal'

export interface SetMealBookingSource {
  id: string
  name: string
  price: number
}

export const flattenSetMealCards = (cards: SetMealCardItem[]): SetMealBookingSource[] =>
  cards.map((card) => ({
    id: card.id,
    name: card.name,
    price: card.price,
  }))

export const getDefaultCustomizationState = (
  config?: SetMealCustomizationConfig,
): SetMealCustomizationState => ({
  excludes: [],
  drink: config?.drinks?.[0]?.value ?? '',
  sugarLevel: config?.sugarLevels?.[0]?.value ?? '',
  iceLevel: config?.iceLevels?.[0]?.value ?? '',
})

export const cloneCustomizationState = (
  state: SetMealCustomizationState,
): SetMealCustomizationState => ({
  excludes: [...state.excludes],
  drink: state.drink,
  sugarLevel: state.sugarLevel,
  iceLevel: state.iceLevel,
})

export const buildSetMealCustomizationSummary = (
  state?: SetMealCustomizationState | null,
): string[] => {
  if (!state) {
    return []
  }

  const lines: string[] = []

  if (state.excludes.length > 0) {
    lines.push(state.excludes.join('・'))
  }

  const drinkSummary = [state.drink, state.sugarLevel, state.iceLevel].filter(Boolean).join('・')

  if (drinkSummary) {
    lines.push(drinkSummary)
  }

  return lines
}

const buildDateLabel = (diningDate: string): string => {
  const rawDate = new Date(`${diningDate}T00:00:00`)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']

  if (Number.isNaN(rawDate.getTime())) {
    return diningDate
  }

  const yyyy = rawDate.getFullYear()
  const mm = String(rawDate.getMonth() + 1).padStart(2, '0')
  const dd = String(rawDate.getDate()).padStart(2, '0')
  const weekday = weekdays[rawDate.getDay()]

  return `${yyyy}/${mm}/${dd}(${weekday})`
}

export const buildSetMealSubmitTicket = (params: {
  cards: SetMealCardItem[]
  selections: Record<string, number>
  customizations: Record<string, SetMealCustomizationState>
  locationLabel: string
  diningDate: string
  pickupTime: string
}): SetMealSubmitTicket => {
  const selectedCards = params.cards.filter((card) => (params.selections[card.id] ?? 0) > 0)

  return {
    pickupCode: 'C141',
    title: '套餐',
    locationLabel: params.locationLabel,
    dateTimeLabel: `${buildDateLabel(params.diningDate)} ${params.pickupTime}`,
    items: selectedCards.map((card) => ({
      name: card.name,
      customizationSummary: buildSetMealCustomizationSummary(params.customizations[card.id]),
      amount: card.price * (params.selections[card.id] ?? 0),
    })),
  }
}
