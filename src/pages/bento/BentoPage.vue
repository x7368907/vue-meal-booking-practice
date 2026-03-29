<script setup lang="ts">
import BentoDateSection from '@/components/business/BentoDateSection.vue'
import BentoFilterPanel from '@/components/business/BentoFilterPanel.vue'
import BentoSubmitModal from '@/components/business/BentoSubmitModal.vue'
import BentoSummaryBar from '@/components/business/BentoSummaryBar.vue'
import MealBookingTabs from '@/components/business/MealBookingTabs.vue'
import { useBentoPage } from '@/composables/useBentoPage'
import { usePageTitle } from '@/composables/usePageTitle'
import { bentoPageConfig } from '@/configs/bento.config'
import { mealBookingTabsConfig } from '@/configs/meal-booking-tabs.config'

usePageTitle(bentoPageConfig.title)

const {
  closeSuccessModal,
  cutoffLines,
  expandedCardIds,
  extension,
  handleSearch,
  isLoading,
  isSuccessModalOpen,
  locationOptions,
  pickupTickets,
  searchForm,
  selectedQuantities,
  canSubmit,
  submitBooking,
  submitting,
  summary,
  toggleCard,
  updateExtension,
  updateQuantity,
  visibleSections,
} = useBentoPage()
</script>

<template>
  <div class="bento-page">
    <div class="bento-page__container">
      <MealBookingTabs :items="mealBookingTabsConfig" />

      <div class="bento-page__filter-area">
        <BentoFilterPanel
          v-model="searchForm"
          :cutoff-lines="cutoffLines"
          :cutoff-title="bentoPageConfig.cutoffTitle"
          :location-options="locationOptions"
          @search="handleSearch"
        />
      </div>

      <BentoSummaryBar
        :amount="summary.totalAmount"
        :extension="extension"
        :disabled="!canSubmit"
        :submitting="submitting"
        @update:extension="updateExtension"
        @submit="submitBooking"
      />

      <a-spin :spinning="isLoading">
        <BentoDateSection
          v-for="section in visibleSections"
          :key="section.id"
          :section="section"
          :quantities="selectedQuantities"
          :expanded-card-ids="expandedCardIds"
          @toggle="toggleCard"
          @quantity-change="updateQuantity"
        />
      </a-spin>
    </div>

    <BentoSubmitModal
      :open="isSuccessModalOpen"
      :tickets="pickupTickets"
      :extension="extension"
      :prepaid-amount="summary.totalAmount"
      @close="closeSuccessModal"
    />
  </div>
</template>

<style scoped>
.bento-page {
  min-height: 100vh;
  background: white;
}

.bento-page__container {
  width: min(944px, calc(100% - 74px));
  margin: 0 auto;
  padding: 16px 0 48px;
}

.bento-page__filter-area {
  margin-top: 22px;
}
</style>
