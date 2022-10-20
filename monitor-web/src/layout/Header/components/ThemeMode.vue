<script setup lang="ts">
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
</script>

<template>
  <n-icon size="20" @click="themeStore.toggleDarkMode" cursor-pointer>
    <icon:mdi:moon-waning-crescent v-if="themeStore.darkMode" />
    <icon:ion:sunny v-else />
  </n-icon>
</template>
