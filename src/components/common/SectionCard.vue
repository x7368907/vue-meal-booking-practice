<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="section-card">
    <header class="section-card__header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>

      <slot name="extra" />
    </header>

    <div class="section-card__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section-card {
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-card);
}

.section-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.section-card__header h2,
.section-card__header p {
  margin: 0;
}

.section-card__header p {
  margin-top: 8px;
  color: var(--color-text-soft);
}
</style>
