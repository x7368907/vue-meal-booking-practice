import type { BentoDateSection, BentoMealCard, BentoMealOption, BentoPickupTicket } from '@/types/bento'

const mealPeriodTimeRangeMap: Record<string, string> = {
  午餐: '11:00-13:30',
  晚餐: '17:30-20:00',
}

export interface BentoBookingSource {
  id: string
  name: string
  price: number
}

export const filterBentoSections = (sections: BentoDateSection[], diningDate: string): BentoDateSection[] => {
  if (!diningDate) {
    return sections
  }

  return sections.filter((section) => section.date >= diningDate)
}

export const flattenBentoOptions = (sections: BentoDateSection[]): BentoBookingSource[] =>
  sections.flatMap((section) =>
    section.cards.flatMap((card) =>
      card.options.map((option) => ({
        id: option.id,
        name: option.name,
        price: option.price,
      })),
    ),
  )

export const buildBentoCardSummary = (
  card: BentoMealCard,
  quantities: Record<string, number>,
): { summaryText: string; totalAmount: number } => {
  const selectedOptions = card.options.filter((option) => (quantities[option.id] ?? 0) > 0)
  const summaryText = selectedOptions
    .map((option) => `${option.name}x${quantities[option.id] ?? 0}`)
    .join('、')

  const totalAmount = selectedOptions.reduce(
    (total, option) => total + option.price * (quantities[option.id] ?? 0),
    0,
  )

  return {
    summaryText,
    totalAmount,
  }
}

export const getBentoTimeRange = (mealPeriod: string): string =>
  mealPeriodTimeRangeMap[mealPeriod] ?? '11:00-13:30'

export const getOptionQuantity = (option: BentoMealOption, quantities: Record<string, number>): number =>
  quantities[option.id] ?? 0

const buildSectionDateLabel = (section: BentoDateSection): string => {
  const formattedDate = section.date.replace(/-/g, '/')
  const weekdayMatch = section.displayDate.match(/\(.+\)/)

  return weekdayMatch ? `${formattedDate}${weekdayMatch[0]}` : formattedDate
}

export const buildBentoPickupTickets = (
  sections: BentoDateSection[],
  quantities: Record<string, number>,
  locationLabel: string,
): BentoPickupTicket[] => {
  let pickupSequence = 141

  return sections.flatMap((section) =>
    section.cards
      .map((card) => {
        const selectedOptions = card.options.filter((option) => (quantities[option.id] ?? 0) > 0)

        if (selectedOptions.length === 0) {
          return null
        }

        const amount = selectedOptions.reduce(
          (total, option) => total + option.price * (quantities[option.id] ?? 0),
          0,
        )

        const ticket: BentoPickupTicket = {
          pickupCode: `B${pickupSequence}`,
          title: '便當',
          locationLabel,
          mealItems: selectedOptions.map((option) => ({
            name: option.name,
            quantity: quantities[option.id] ?? 0,
          })),
          amount,
          dateTimeLabel: `${buildSectionDateLabel(section)}｜${getBentoTimeRange(card.mealPeriod)}`,
        }

        pickupSequence += 1

        return ticket
      })
      .filter((ticket): ticket is BentoPickupTicket => ticket !== null),
  )
}
