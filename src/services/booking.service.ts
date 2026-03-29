import { bookingApi } from '@/api/booking.api'
import type { BookingSubmitPayload } from '@/types/booking'

export const bookingService = {
  submitBooking(payload: BookingSubmitPayload) {
    return bookingApi.submitBooking(payload)
  },
}
