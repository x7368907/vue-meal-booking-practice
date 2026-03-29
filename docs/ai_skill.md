# AI Skill Notes

## 本次作業刻意展示的能力

- 能把報餐需求拆成 `BuffetPage`、`BentoPage`、`SetMealPage`
- 能用 `config` 與 `mockData` 管理餐種配置與餐點資料
- 能區分 `composable`、`store`、`service`、`api`、`util` 在報餐流程中的責任
- 能抽出 `MealCard`、`MealTable`、`MealSummary`、`BookingForm` 等可重用元件

## 如果使用 AI 協作開發

- 先要求 AI 建立資料夾與命名規則，再補報餐流程
- 讓 AI 生成 table / form 時，餐種配置與 mock data 必須獨立
- 要求 AI 保持資料流一致，避免 page 直接 import mock data
- 要求 AI 把「選餐、摘要、送單」拆成 store / composable / service，而不是全寫在頁面內

## 後續可要求 AI 協助的項目

- 把 mock submit 換成真實 REST API
- 補餐點搜尋、篩選、日期限制與截止時間
- 補報餐截止規則、權限與送單紀錄
- 補 Vitest / Vue Testing Library 測試骨架
