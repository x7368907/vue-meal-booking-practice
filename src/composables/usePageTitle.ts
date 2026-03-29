import { watchEffect } from 'vue'

export const usePageTitle = (title: string) => {
  watchEffect(() => {
    document.title = `${title} | Meal Booking Practice`
  })
}
