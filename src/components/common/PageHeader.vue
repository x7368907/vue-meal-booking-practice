<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="page-header">
    <p class="page-header__eyebrow">Meal Booking Page</p>
    <h1>{{ title }}</h1>
    <p class="page-header__description">{{ description }}</p>
  </section>
</template>

<style scoped>
.page-header {
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(232, 243, 251, 0.9));
  box-shadow: var(--shadow-card);
}

.page-header__eyebrow {
  margin: 0 0 8px;
  color: var(--color-primary);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
}

.page-header__description {
  max-width: 720px;
  margin: 12px 0 0;
  color: var(--color-text-soft);
}
</style>
