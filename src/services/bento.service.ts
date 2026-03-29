import { bentoApi } from '@/api/bento.api'

export const bentoService = {
  async getBentoPageData() {
    return bentoApi.getBentoPageData()
  },
}
