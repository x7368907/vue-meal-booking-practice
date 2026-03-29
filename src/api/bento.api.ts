import { bentoMockData } from '@/mocks/bento.mockData'

export const bentoApi = {
  async getBentoPageData() {
    return Promise.resolve(bentoMockData)
  },
}
