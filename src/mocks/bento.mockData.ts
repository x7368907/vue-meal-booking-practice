import type { BentoPageResponse } from '@/types/bento'

export const bentoMockData: BentoPageResponse = {
  locationOptions: [
    {
      label: '大成台南總部',
      value: 'tainan-hq',
    },
    {
      label: '台北辦公室',
      value: 'taipei-office',
    },
  ],
  defaultLocation: 'tainan-hq',
  defaultDiningDate: '2026-02-02',
  defaultExtension: '#5311',
  cutoffLines: ['午餐：前日17:00', '晚餐：當日10:00'],
  sections: [
    {
      id: '2026-02-02',
      date: '2026-02-02',
      displayDate: '02/02 (一)',
      status: 'suspended',
      notices: ['午餐：總部股東會，暫停供餐。', '晚餐：總部股東會，暫停供餐。'],
      cards: [],
    },
    {
      id: '2026-02-03',
      date: '2026-02-03',
      displayDate: '02/03 (二)',
      status: 'available',
      cards: [
        {
          id: 'BEN-20260203-LUNCH',
          mealPeriod: '午餐',
          tone: 'lunch',
          isExpandedByDefault: true,
          options: [
            { id: 'BEN-20260203-LUNCH-CHICKEN', name: '雞肉便當', price: 30, thumbnailLabel: '雞', thumbnailColor: '#d88b4a' },
            { id: 'BEN-20260203-LUNCH-FISH', name: '炸魚便當', price: 30, thumbnailLabel: '魚', thumbnailColor: '#b88c42' },
            { id: 'BEN-20260203-LUNCH-PORK', name: '豬肉便當', price: 30, thumbnailLabel: '豬', thumbnailColor: '#b06a42' },
            { id: 'BEN-20260203-LUNCH-VEG', name: '素食便當', price: 30, thumbnailLabel: '素', thumbnailColor: '#72a96d' },
          ],
        },
        {
          id: 'BEN-20260203-DINNER',
          mealPeriod: '晚餐',
          tone: 'dinner',
          options: [
            { id: 'BEN-20260203-DINNER-CHICKEN', name: '雞肉便當', price: 30, thumbnailLabel: '雞', thumbnailColor: '#d88b4a' },
          ],
        },
      ],
    },
    {
      id: '2026-02-04',
      date: '2026-02-04',
      displayDate: '02/04 (三)',
      status: 'available',
      cards: [
        {
          id: 'BEN-20260204-LUNCH',
          mealPeriod: '午餐',
          tone: 'lunch',
          options: [
            { id: 'BEN-20260204-LUNCH-FISH', name: '炸魚便當', price: 30, thumbnailLabel: '魚', thumbnailColor: '#b88c42' },
          ],
        },
        {
          id: 'BEN-20260204-DINNER',
          mealPeriod: '晚餐',
          tone: 'dinner',
          options: [
            { id: 'BEN-20260204-DINNER-CHICKEN', name: '雞肉便當', price: 30, thumbnailLabel: '雞', thumbnailColor: '#d88b4a' },
          ],
        },
      ],
    },
    {
      id: '2026-02-05',
      date: '2026-02-05',
      displayDate: '02/05 (四)',
      status: 'unpublished',
      message: '尚未公布菜色。',
      cards: [],
    },
    {
      id: '2026-02-06',
      date: '2026-02-06',
      displayDate: '02/06 (五)',
      status: 'unpublished',
      message: '尚未公布菜色。',
      cards: [],
    },
  ],
}
