<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <n-icon size="20" @click="toggle" cursor-pointer>
    <icon:ant-design:fullscreen-exit-outlined v-if="isFullscreen" />
    <icon:ant-design:fullscreen-outlined v-else />
  </n-icon>
</template>
