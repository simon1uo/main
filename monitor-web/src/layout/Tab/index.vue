<script setup lang="ts">
import ContextMenu from './components/ContextMenu.vue'
import ScrollX from '@/components/common/ScrollX.vue'
import { TabItem, useTabStore, useThemeStore } from '@/store'
import { nextTick, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const tabStore = useTabStore()
const themeStore = useThemeStore()

interface ContextMenuOption {
  show: boolean
  x: number
  y: number
  currentPath: string
}

const contextMenuOption = reactive<ContextMenuOption>({
  show: false,
  x: 0,
  y: 0,
  currentPath: '',
})

watch(
  () => route.path,
  () => {
    const { name, path } = route
    const title = (route.meta?.title as string) || ''
    tabStore.addTab({ name: name as string, path, title })
  },
  { immediate: true }
)

const handleTagClick = (path: string) => {
  tabStore.setActiveTab(path)
  router.push(path)
}

const showContextMenu = () => {
  contextMenuOption.show = true
}

const hideContextMenu = () => {
  contextMenuOption.show = false
}

const setContextMenu = (x: number, y: number, currentPath: string) => {
  Object.assign(contextMenuOption, { x, y, currentPath })
}

async function handleContextMenu(e: MouseEvent, tabItem: TabItem) {
  const { clientX, clientY } = e
  hideContextMenu()
  setContextMenu(clientX, clientY, tabItem.path)
  await nextTick()
  showContextMenu()
}
</script>

<template>
  <ScrollX bg-white dark:bg-dark :style="{ height: `${themeStore.tab.height}px` }">
    <n-tag
      v-for="tab in tabStore.tabs"
      :key="tab.path"
      :type="tabStore.activeTab === tab.path ? 'primary' : 'default'"
      :closable="tabStore.tabs.length > 1"
      @click="handleTagClick(tab.path)"
      @close.stop="tabStore.removeTab(tab.path)"
      @contextmenu.prevent="handleContextMenu($event, tab)"
      class="ml-5 px-15 rounded-5 cursor-pointer"
    >
      {{ tab.title }}
    </n-tag>
  </ScrollX>
  <ContextMenu
    v-model:show="contextMenuOption.show"
    :current-path="contextMenuOption.currentPath"
    :x="contextMenuOption.x"
    :y="contextMenuOption.y"
  />
</template>

<style lang="scss">
.n-tag__close {
  box-sizing: content-box;
  border-radius: 50%;
  font-size: 12px;
  padding: 2px;
  transform: scale(0.9);
  transform: translateX(5px);
  transition: all 0.3s;
}
</style>
