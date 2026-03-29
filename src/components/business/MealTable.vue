<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumnsType } from 'ant-design-vue'

import StatusTag from '@/components/common/StatusTag.vue'
import { useTablePagination } from '@/composables/useTablePagination'
import type { MealOption } from '@/types/meal'
import { formatCurrency } from '@/utils/format.util'

const props = defineProps<{
  columns: TableColumnsType<MealOption>
  rows: MealOption[]
  quantities: Record<string, number>
  loading?: boolean
}>()

const emit = defineEmits<{
  quantityChange: [mealId: string, quantity: number]
}>()

const dataSource = computed(() => props.rows)
const { pagination } = useTablePagination(dataSource)
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="pagination"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'mealName'">
        <div class="meal-table__name">
          <strong>{{ record.name }}</strong>
          <span>{{ record.description }}</span>
        </div>
      </template>

      <template v-else-if="column.key === 'price'">
        {{ formatCurrency(record.price) }}
      </template>

      <template v-else-if="column.key === 'availability'">
        <div class="meal-table__availability">
          <StatusTag :status="record.availability" />
          <span>剩餘 {{ record.availableQuantity }} 份</span>
        </div>
      </template>

      <template v-else-if="column.key === 'selection'">
        <a-input-number
          :min="0"
          :max="record.availableQuantity"
          :value="quantities[record.id] ?? 0"
          :disabled="record.availability === 'sold-out'"
          @update:value="emit('quantityChange', record.id, Number($event ?? 0))"
        />
      </template>
    </template>
  </a-table>
</template>

<style scoped>
.meal-table__name,
.meal-table__availability {
  display: grid;
  gap: 4px;
}

.meal-table__name span,
.meal-table__availability span {
  color: var(--color-text-soft);
}
</style>
