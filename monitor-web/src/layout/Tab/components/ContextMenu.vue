<script setup lang="ts">
import { useAppStore, useTabStore } from '@/store'
import { computed } from 'vue'
import { renderIcon } from '~/src/utils/common/icon'
import func from '~/vue-temp/vue-editor-bridge'

interface TabProps {
  show?: boolean
  currentPath?: string
  x: number
  y: number
}

const props = withDefaults(defineProps<TabProps>(), {
  show: false,
  currentPath: '',
})

const appStore = useAppStore()
const tabStore = useTabStore()

const options = computed(() => [
  {
    label: '重新加载',
    key: 'reload',
    disabled: props.currentPath !== tabStore.activeTab,
    icon: renderIcon('mdi:refresh', { size: 14 }),
  },
  {
    label: '关闭',
    key: 'close',
    disabled: tabStore.tabs.length <= 1,
    icon: renderIcon('mdi:close', { size: 14 }),
  },
  {
    label: '关闭其他',
    key: 'close-other',
    disabled: tabStore.tabs.length <= 1,
    icon: renderIcon('mdi:arrow-expand-horizontal', { size: 14 }),
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    disabled: tabStore.tabs.length <= 1 || props.currentPath === tabStore.tabs[0].path,
    icon: renderIcon('mdi:arrow-expand-left', { size: 14 }),
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    disabled: tabStore.tabs.length <= 1 || props.currentPath === tabStore.tabs[tabStore.tabs.length - 1].path,
    icon: renderIcon('mdi:arrow-expand-right', { size: 14 }),
  },
])

const actionMap = new Map([
  [
    'reload',
    () => {
      appStore.reloadPage()
    },
  ],
  [
    'close',
    () => {
      tabStore.removeTab(props.currentPath)
    },
  ],
  [
    'close-other',
    () => {
      tabStore.removeOther(props.currentPath)
    },
  ],
  [
    'close-left',
    () => {
      tabStore.removeLeft(props.currentPath)
    },
  ],
  [
    'close-right',
    () => {
      tabStore.removeRight(props.currentPath)
    },
  ],
])

const emit = defineEmits(['update:show'])
const dropdownShow = computed({
  get() {
    return props.show
  },
  set(show) {
    emit('update:show', show)
  },
})

function handleHideDropdown() {
  dropdownShow.value = false
}

function handleSelect(key: string) {
  const actionFn = actionMap.get(key)
  actionFn && actionFn()
  handleHideDropdown()
}
</script>

<template>
  <n-dropdown
    :x="x"
    :y="y"
    :options="options"
    :show="dropdownShow"
    @select="handleSelect"
    @clickoutside="handleHideDropdown"
    placement="bottom-start"
  />
</template>

<style scoped></style>
