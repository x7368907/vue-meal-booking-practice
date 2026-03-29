import { buffetApi } from '@/api/buffet.api'

export const buffetService = {
  async getBuffetPageData() {
    return buffetApi.getBuffetPageData()
  },
}
