import { defineStore } from 'pinia'
import { basicRoutes, asyncRoutes } from '~/src/router/routes'
import { RoutesType } from '~/types/router'
import { filterAsyncRoutes } from './helpers'

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: <RoutesType>[],
    }
  },

  getters: {
    routes(): RoutesType {
      return basicRoutes.concat(this.accessRoutes)
    },
    menus(): RoutesType {
      return this.routes.filter(route => route.name && !route.isHidden)
    },
  },

  actions: {
    generateRoutes(role: string[] = []): RoutesType {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
  },
})
