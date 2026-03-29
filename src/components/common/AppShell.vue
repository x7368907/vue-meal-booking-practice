<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'

import { navigationItems } from '@/configs/navigation.config'
import { useAppStore } from '@/stores/app.store'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { isSidebarCollapsed, menuItems } = storeToRefs(appStore)

const selectedKeys = computed(() => [route.path])
const isFullPageMealLayout = computed(() =>
  ['buffet', 'bento', 'set-meal', 'takeout-record', 'weekly-menu'].includes(String(route.name)),
)

const onMenuClick = ({ key }: { key: string }) => {
  router.push(key)
}
</script>

<template>
  <RouterView v-if="isFullPageMealLayout" />

  <a-layout v-else style="min-height: 100vh; padding: 24px 0;">
    <div class="page-shell app-shell">
      <a-layout-sider
        :collapsed="isSidebarCollapsed"
        :trigger="null"
        collapsible
        class="app-shell__sider"
        width="260"
      >
        <div class="app-shell__brand">
          <p class="app-shell__eyebrow">Meal Booking Practice</p>
          <h1 class="app-shell__title">Lunch Ordering Homework</h1>
        </div>

        <a-menu :items="menuItems" :selected-keys="selectedKeys" mode="inline" @click="onMenuClick" />

        <div class="app-shell__nav-meta">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.key"
            :to="item.path"
            class="app-shell__nav-link"
          >
            <strong>{{ item.label }}</strong>
            <span>{{ item.description }}</span>
          </RouterLink>
        </div>
      </a-layout-sider>

      <a-layout class="app-shell__main">
        <a-layout-header class="app-shell__header">
          <a-button type="text" @click="appStore.toggleSidebar">
            <MenuUnfoldOutlined v-if="isSidebarCollapsed" />
            <MenuFoldOutlined v-else />
          </a-button>

          <div class="app-shell__header-content">
            <p class="app-shell__header-label">Current Meal Page</p>
            <h2>{{ route.meta.title }}</h2>
          </div>
        </a-layout-header>

        <a-layout-content class="app-shell__content">
          <RouterView />
        </a-layout-content>
      </a-layout>
    </div>
  </a-layout>
</template>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
}

.app-shell__sider {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
}

.app-shell__brand {
  padding: 24px 20px 12px;
}

.app-shell__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-shell__title {
  margin: 6px 0 0;
  color: var(--color-secondary);
  font-size: 22px;
  font-weight: 700;
}

.app-shell__nav-meta {
  display: grid;
  gap: 12px;
  padding: 16px 20px 24px;
}

.app-shell__nav-link {
  display: grid;
  gap: 4px;
  padding: 12px;
  border-radius: 12px;
  background: var(--color-surface-muted);
  color: var(--color-text-soft);
}

.app-shell__main {
  min-width: 0;
  background: transparent;
}

.app-shell__header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: auto;
  margin-bottom: 20px;
  padding: 20px 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: var(--shadow-card);
}

.app-shell__header-content p,
.app-shell__header-content h2 {
  margin: 0;
}

.app-shell__header-label {
  color: var(--color-text-soft);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.app-shell__content {
  min-height: calc(100vh - 140px);
}

@media (max-width: 960px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .app-shell__nav-meta {
    display: none;
  }
}
</style>
