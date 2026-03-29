<script setup lang="ts">
import type { SetMealCardItem, SetMealCustomizationState } from '@/types/set-meal'

defineProps<{
  open: boolean
  card: SetMealCardItem | null
  draft: SetMealCustomizationState
}>()

defineEmits<{
  close: []
  save: []
  toggleExclude: [value: string]
  updateDrink: [value: string]
  updateSugarLevel: [value: string]
  updateIceLevel: [value: string]
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open && card" class="set-meal-customize-modal">
      <div class="set-meal-customize-modal__backdrop" @click="$emit('close')" />

      <section class="set-meal-customize-modal__panel">
        <header class="set-meal-customize-modal__header">
          <strong>{{ card.name }}／${{ card.price }}</strong>

          <div class="set-meal-customize-modal__actions">
            <button class="set-meal-customize-modal__save" type="button" @click="$emit('save')">儲存</button>
            <button class="set-meal-customize-modal__cancel" type="button" @click="$emit('close')">取消</button>
          </div>
        </header>

        <div class="set-meal-customize-modal__body">
          <section v-if="card.customizationConfig?.excludes?.length" class="set-meal-customize-modal__section">
            <h3>客製選項</h3>
            <div class="set-meal-customize-modal__choice-row">
              <label
                v-for="option in card.customizationConfig.excludes"
                :key="option.value"
                class="set-meal-customize-modal__checkbox"
              >
                <input
                  type="checkbox"
                  :checked="draft.excludes.includes(option.value)"
                  @change="$emit('toggleExclude', option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </section>

          <section v-if="card.customizationConfig?.drinks?.length" class="set-meal-customize-modal__section">
            <h3>中杯飲料*1</h3>
            <div class="set-meal-customize-modal__choice-row">
              <label
                v-for="option in card.customizationConfig.drinks"
                :key="option.value"
                class="set-meal-customize-modal__radio"
              >
                <input
                  type="radio"
                  name="drink"
                  :checked="draft.drink === option.value"
                  @change="$emit('updateDrink', option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </section>

          <section v-if="card.customizationConfig?.sugarLevels?.length" class="set-meal-customize-modal__section">
            <h3>甜度</h3>
            <div class="set-meal-customize-modal__choice-row">
              <label
                v-for="option in card.customizationConfig.sugarLevels"
                :key="option.value"
                class="set-meal-customize-modal__radio"
              >
                <input
                  type="radio"
                  name="sugar"
                  :checked="draft.sugarLevel === option.value"
                  @change="$emit('updateSugarLevel', option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </section>

          <section v-if="card.customizationConfig?.iceLevels?.length" class="set-meal-customize-modal__section">
            <h3>冰量</h3>
            <div class="set-meal-customize-modal__choice-row">
              <label
                v-for="option in card.customizationConfig.iceLevels"
                :key="option.value"
                class="set-meal-customize-modal__radio"
              >
                <input
                  type="radio"
                  name="ice"
                  :checked="draft.iceLevel === option.value"
                  @change="$emit('updateIceLevel', option.value)"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </section>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.set-meal-customize-modal {
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: grid;
  place-items: center;
}

.set-meal-customize-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
}

.set-meal-customize-modal__panel {
  position: relative;
  z-index: 1;
  width: min(640px, calc(100vw - 32px));
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.24);
}

.set-meal-customize-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid #edf1f5;
}

.set-meal-customize-modal__header strong {
  color: #364152;
  font-size: 14px;
  font-weight: 700;
}

.set-meal-customize-modal__actions {
  display: flex;
  gap: 8px;
}

.set-meal-customize-modal__save,
.set-meal-customize-modal__cancel {
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.set-meal-customize-modal__save {
  background: #17c784;
}

.set-meal-customize-modal__cancel {
  background: #ff4d4f;
}

.set-meal-customize-modal__body {
  padding: 16px 18px 18px;
}

.set-meal-customize-modal__section + .set-meal-customize-modal__section {
  margin-top: 18px;
}

.set-meal-customize-modal__section h3 {
  margin: 0 0 14px;
  color: #4c5562;
  font-size: 13px;
  font-weight: 700;
}

.set-meal-customize-modal__choice-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 24px;
}

.set-meal-customize-modal__checkbox,
.set-meal-customize-modal__radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #5f6975;
  font-size: 13px;
}

.set-meal-customize-modal__checkbox input,
.set-meal-customize-modal__radio input {
  margin: 0;
}
</style>
