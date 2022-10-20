import { defineStore } from 'pinia'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
import { initThemeSettings, getNaiveThemeOverrides } from './helpers'

type ThemeState = Theme.Setting

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => initThemeSettings(),

  getters: {
    naiveThemeOverrides(): GlobalThemeOverrides {
      return getNaiveThemeOverrides({ primary: this.primaryColor, ...this.otherColor })
    },
    naiveTheme(): BuiltInGlobalTheme | undefined {
      return this.darkMode ? darkTheme : undefined
    },
  },

  actions: {
    setMobileMode(isMobile: boolean) {
      this.isMobile = isMobile
    },
    setDarkMode(darkMode: boolean) {
      this.darkMode = darkMode
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    toggleCollapsed() {
      this.sider.collapsed = !this.sider.collapsed
    },
    setCollapsed(collapsed: boolean) {
      this.sider.collapsed = collapsed
    },
    setPrimaryColor(color: string) {
      this.primaryColor = color
    },
  },
})
