<script setup lang="ts">
import BuffetDateSection from '@/components/business/BuffetDateSection.vue'
import BuffetFilterPanel from '@/components/business/BuffetFilterPanel.vue'
import BuffetSubmitModal from '@/components/business/BuffetSubmitModal.vue'
import MealBookingTabs from '@/components/business/MealBookingTabs.vue'
import { useBuffetPage } from '@/composables/useBuffetPage'
import { usePageTitle } from '@/composables/usePageTitle'
import { buffetPageConfig } from '@/configs/buffet.config'
import { mealBookingTabsConfig } from '@/configs/meal-booking-tabs.config'

usePageTitle(buffetPageConfig.title)

const {
  closeSuccessModal,
  cutoffLines,
  decreaseQuantity,
  handleSearch,
  isLoading,
  isSuccessModalOpen,
  increaseQuantity,
  locationOptions,
  searchForm,
  selectedLocationLabel,
  selectedQuantities,
  canSubmit,
  pickupTickets,
  submitBooking,
  submitting,
  summary,
  visibleSections,
} = useBuffetPage()
</script>

<template>
  <div class="buffet-page">
    <div class="buffet-page__container">
      <MealBookingTabs :items="mealBookingTabsConfig" />

      <div class="buffet-page__filter-area">
        <BuffetFilterPanel
          v-model="searchForm"
          :cutoff-lines="cutoffLines"
          :cutoff-title="buffetPageConfig.cutoffTitle"
          :location-options="locationOptions"
          @search="handleSearch"
        />
      </div>

      <div class="buffet-page__action-row">
        <a-button
          class="buffet-page__submit-btn"
          type="primary"
          :loading="submitting"
          :disabled="!canSubmit"
          @click="submitBooking"
        >
          {{ buffetPageConfig.submitButtonText }}
        </a-button>
      </div>

      <a-spin :spinning="isLoading">
        <BuffetDateSection
          v-for="section in visibleSections"
          :key="section.id"
          :section="section"
          :quantities="selectedQuantities"
          @decrease="decreaseQuantity"
          @increase="increaseQuantity"
        />
      </a-spin>
    </div>

    <BuffetSubmitModal
      :open="isSuccessModalOpen"
      :tickets="pickupTickets"
      @close="closeSuccessModal"
    />
  </div>
</template>

<style scoped>
.buffet-page {
  min-height: 100vh;
  background: white;
}

.buffet-page__container {
  width: min(944px, calc(100% - 74px));
  margin: 0 auto;
  padding: 16px 0 48px;
}

.buffet-page__filter-area {
  margin-top: 22px;
}

.buffet-page__action-row {
  display: flex;
  justify-content: flex-end;
  padding: 10px 8px 6px 0;
}

.buffet-page__submit-btn {
  min-width: 84px;
  height: 29px;
  padding: 0 12px;
  border-color: #12c98c;
  border-radius: 7px;
  background: #12c98c;
  box-shadow: none;
  font-size: 13px;
  font-weight: 600;
  line-height: 29px;
}

.buffet-page__submit-btn[disabled],
.buffet-page__submit-btn:disabled {
  border-color: #b8d9cb !important;
  background: #dbece5 !important;
  color: #ffffff !important;
  cursor: not-allowed !important;
}

@media (max-width: 768px) {
  .buffet-page__container {
    width: calc(100% - 32px);
    padding-top: 12px;
  }
}
</style>
