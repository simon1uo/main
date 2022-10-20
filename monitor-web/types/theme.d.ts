interface Sider {
  width: number
  collapsedWidth: number
  collapsed: boolean
}

interface Header {
  visible: boolean
  height: number
}

interface Tab {
  visible: boolean
  height: number
}

interface OtherColor {
  info: string
  success: string
  warning: string
  error: string
}

declare namespace Theme {
  interface Setting {
    isMobile: boolean
    darkMode: boolean
    sider: Sider
    header: Header
    tab: Tab
    primaryColor: string
    otherColor: OtherColor
  }
}
