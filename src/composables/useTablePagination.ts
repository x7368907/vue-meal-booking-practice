import { computed, type Ref, ref } from 'vue'

export const useTablePagination = <T>(rows: Ref<T[]>) => {
  const pageSize = ref(10)
  const currentPage = ref(1)

  const pagination = computed(() => ({
    current: currentPage.value,
    pageSize: pageSize.value,
    total: rows.value.length,
    showSizeChanger: false,
  }))

  return {
    pagination,
  }
}
