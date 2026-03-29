import type { BookingSubmitPayload, BookingSubmitResult } from '@/types/booking'

export const bookingApi = {
  async submitBooking(payload: BookingSubmitPayload): Promise<BookingSubmitResult> {
    return Promise.resolve({
      referenceNo: `${payload.mealType.toUpperCase()}-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    })
  },
}
