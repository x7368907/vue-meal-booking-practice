# Frontend Architecture

## 目標

本作業以「報餐」為主題建立 Vue 3 + TypeScript 前端骨架。現階段先完成可交付的三頁式結構與資料流，重點是把餐點資料、選餐狀態、摘要計算與送單流程拆成可維護的分層。

## 分層說明

- `pages`: 每個 route 對應一個 page，僅負責組裝畫面與觸發資料流程。
- `components/common`: 通用 UI 元件，例如 `AppShell`、`PageHeader`、`SectionCard`、`StatusTag`。
- `components/business`: 帶有報餐語意的元件，例如 `MealCard`、`MealTable`、`MealSummary`、`BookingForm`、`BookingActionBar`。
- `composables`: 抽離頁面共用流程，例如 `useMealPage` 會集中處理載入餐點、已選份數、摘要與送單行為。
- `stores`: 把餐點清單與報餐狀態分開管理，避免 page 直接處理細節。
- `services`: 承接資料排序、送單協調等邏輯，作為 page/store 與 api 間的緩衝層。
- `api`: 目前以 mock data 模擬 API，未來可直接替換成 axios request。
- `configs`: 每個報餐 page 各自保有配置，例如 `buffet.config.ts`、`bento.config.ts`、`setMeal.config.ts`。
- `mocks`: mock data 集中管理，避免散落在元件內。
- `utils`: 純函式工具，例如格式化金額與計算報餐摘要。

## 資料流

`mockData -> api -> service -> store/composable -> page -> component`

這樣的安排可以清楚展示：

- page 不直接依賴 mock data
- 報餐配置、餐點資料與摘要邏輯互相獨立
- 真 API 上線時只需替換 `api` 或 `service`
- 選餐與送單狀態可持續保留在 store

## 目前 3 個 Page

- `/buffet`: 自助餐報餐頁，展示多人份數選擇
- `/bento`: 便當報餐頁，展示個人/部門代訂骨架
- `/set-meal`: 套餐報餐頁，展示會議或接待用餐場景

## 下一步可擴充方向

- 補上 axios instance 與 error handling
- 為送單流程補 error state 與表單驗證
- 加入條件篩選、日期控制、會議室或成本中心欄位
- 為 table / summary / submit 流程補單元測試與整合測試
