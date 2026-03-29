<script setup lang="ts">
import MealBookingTabs from '@/components/business/MealBookingTabs.vue'
import SetMealCard from '@/components/business/SetMealCard.vue'
import SetMealCustomizeModal from '@/components/business/SetMealCustomizeModal.vue'
import SetMealFilterPanel from '@/components/business/SetMealFilterPanel.vue'
import SetMealSubmitModal from '@/components/business/SetMealSubmitModal.vue'
import SetMealSummaryBar from '@/components/business/SetMealSummaryBar.vue'
import { usePageTitle } from '@/composables/usePageTitle'
import { useSetMealPage } from '@/composables/useSetMealPage'
import { mealBookingTabsConfig } from '@/configs/meal-booking-tabs.config'
import { setMealPageConfig } from '@/configs/setMeal.config'

usePageTitle(setMealPageConfig.title)

const {
  activeCard,
  cards,
  closeCustomizeModal,
  closeSuccessModal,
  customizationDraft,
  extension,
  getCustomizationSummary,
  handleSearch,
  isCustomizeModalOpen,
  isSuccessModalOpen,
  isLoading,
  locationOptions,
  openCustomizeModal,
  periodOptions,
  saveCustomization,
  searchForm,
  selectedQuantities,
  canSubmit,
  submitTicket,
  submitBooking,
  submitting,
  summary,
  toggleExclude,
  updateDrink,
  updateExtension,
  updateIceLevel,
  updateQuantity,
  updateSugarLevel,
} = useSetMealPage()
</script>

<template>
  <div class="set-meal-page">
    <div class="set-meal-page__container">
      <MealBookingTabs :items="mealBookingTabsConfig" />

      <div class="set-meal-page__filter-area">
        <SetMealFilterPanel
          v-model="searchForm"
          :location-options="locationOptions"
          :period-options="periodOptions"
          :notice-text="setMealPageConfig.cutoffTitle"
          @search="handleSearch"
        />
      </div>

      <SetMealSummaryBar
        :amount="summary.totalAmount"
        :extension="extension"
        :disabled="!canSubmit"
        :submitting="submitting"
        @update:extension="updateExtension"
        @submit="submitBooking"
      />

      <a-spin :spinning="isLoading">
        <div class="set-meal-page__grid">
          <SetMealCard
            v-for="card in cards"
            :key="card.id"
            :card="card"
            :quantity="selectedQuantities[card.id] ?? 0"
            :customization-summary="getCustomizationSummary(card.id)"
            @open-customize="openCustomizeModal"
            @quantity-change="updateQuantity"
          />
        </div>
      </a-spin>
    </div>

    <SetMealCustomizeModal
      :open="isCustomizeModalOpen"
      :card="activeCard"
      :draft="customizationDraft"
      @close="closeCustomizeModal"
      @save="saveCustomization"
      @toggle-exclude="toggleExclude"
      @update-drink="updateDrink"
      @update-sugar-level="updateSugarLevel"
      @update-ice-level="updateIceLevel"
    />

    <SetMealSubmitModal
      :open="isSuccessModalOpen"
      :ticket="submitTicket"
      :extension="extension"
      :prepaid-amount="summary.totalAmount"
      @close="closeSuccessModal"
    />
  </div>
</template>

<style scoped>
.set-meal-page {
  min-height: 100vh;
  background: #ffffff;
}

.set-meal-page__container {
  width: min(1020px, calc(100% - 74px));
  margin: 0 auto;
  padding: 16px 0 48px;
}

.set-meal-page__filter-area {
  margin-top: 24px;
}

.set-meal-page__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 1080px) {
  .set-meal-page__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .set-meal-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
