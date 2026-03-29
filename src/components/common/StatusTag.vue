<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string
}>()

const colorMap: Record<string, string> = {
  available: 'green',
  limited: 'gold',
  'sold-out': 'default',
  submitted: 'blue',
}

const tagColor = computed(() => colorMap[props.status] ?? 'default')
</script>

<template>
  <a-tag :color="tagColor">{{ status }}</a-tag>
</template>
