import { RouteRecordRaw } from 'vue-router'

type RoutesType = Array<RouteType>

type RouteModule = Record<string, { default: RouteType }>

interface Meta {
  title?: string
  icon?: string
  customIcon?: string
  order?: number
  role?: Array<string>
  requireAuth?: boolean
}

interface RouteItem {
  name: string
  path: string
  redirect?: string
  isHidden?: boolean
  meta?: Meta
  children?: RoutesType
}

type RouteType = RouteRecordRaw & RouteItem
