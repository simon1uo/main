<script setup lang="ts">
import { useUserStore } from '@/store'
import { renderIcon } from '@/utils/common/icon'

const userStore = useUserStore()

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:logout', { size: 14 }),
  },
]

function handleSelect(key: string) {
  window.$dialog?.info({
    content: '确定退出登录',
    title: '提示',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick() {
      userStore.logout()
    },
  })
}
</script>

<template>
  <n-dropdown trigger="hover" @select="handleSelect" :options="options">
    <div flex items-center cursor-pointer>
      <img :src="userStore.avatar" alt="avatar" mr10 w-35 h-35 rounded-full />
      <span hidden sm:block fw-600>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>
