import { buffetMockData } from '@/mocks/buffet.mockData'

export const buffetApi = {
  async getBuffetPageData() {
    return Promise.resolve(buffetMockData)
  },
}
