# Code Style

## 命名規範

- Vue component 使用 `PascalCase`
- composable 使用 `useXxx`
- store 檔名使用 `xxx.store.ts`
- service 檔名使用 `xxx.service.ts`
- api 檔名使用 `xxx.api.ts`
- config 檔名使用 `xxxx.config.ts`
- mock data 檔名使用 `xxx.mockData.ts`

## 結構原則

- page 不直接寫死 mock data
- table columns 必須集中於 config 檔案
- 可共用區塊優先抽成 common 或 business component
- util 僅放純函式，不放 Vue 相依邏輯
- store 負責狀態，service 負責資料協調，api 負責資料來源
- 報餐主題相關命名需明確反映餐種與流程，例如 `MealTable`、`booking.store.ts`

## Vue 撰寫原則

- 使用 `<script setup lang="ts">`
- props 與型別明確定義
- page 內盡量只保留組裝邏輯
- 對重複 UI 保持可抽換、可擴充
- 選餐、摘要、送單流程優先放在 composable / store，而不是 page 內硬寫

## 樣式原則

- 以 page shell + section card 控制整體節奏
- 保留一致的 spacing、radius、shadow token
- 避免把頁面細節硬寫在單一大型 component
- 讓不同餐種頁面共用相同框架，但保留各自文案與配置差異
