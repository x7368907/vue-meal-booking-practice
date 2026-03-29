import type { BuffetDateSection, BuffetMealItem, BuffetPickupTicket } from '@/types/buffet'

const mealPeriodTimeRangeMap: Record<string, string> = {
  午餐: '11:00-13:30',
  下午茶: '14:00-17:00',
  晚餐: '17:00-19:30',
}

const buildSectionDateLabel = (section: BuffetDateSection): string => {
  const formattedDate = section.date.replace(/-/g, '/')
  const weekdayMatch = section.displayDate.match(/\(.+\)/)

  return weekdayMatch ? `${formattedDate}${weekdayMatch[0]}` : formattedDate
}

export const filterBuffetSections = (
  sections: BuffetDateSection[],
  diningDate: string,
): BuffetDateSection[] => {
  if (!diningDate) {
    return sections
  }

  return sections.filter((section) => section.date >= diningDate)
}

export const flattenBuffetMeals = (sections: BuffetDateSection[]): BuffetMealItem[] =>
  sections.flatMap((section) =>
    section.meals.map((meal) => ({
      ...meal,
      dateLabel: meal.dateLabel || buildSectionDateLabel(section),
      timeRange: mealPeriodTimeRangeMap[meal.mealPeriod] || meal.timeRange || '11:00-13:30',
    })),
  )

export const buildBuffetPickupTickets = (
  meals: BuffetMealItem[],
  selections: Record<string, number>,
  locationLabel: string,
): BuffetPickupTicket[] =>
  meals
    .filter((meal) => (selections[meal.id] ?? 0) > 0)
    .map((meal, index) => ({
      pickupCode: `A${141 + index}`,
      title: '自助餐',
      locationLabel,
      mealName: meal.name,
      quantity: selections[meal.id] ?? 0,
      dateTimeLabel: `${meal.dateLabel || ''}｜${meal.timeRange || mealPeriodTimeRangeMap[meal.mealPeriod] || '11:00-13:30'}`,
    }))
