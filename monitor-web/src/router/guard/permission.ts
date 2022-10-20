import type { Router } from 'vue-router'
import { usePermissionStore, useUserStore } from '@/store'
import { getToken, refreshAcessToken, removeToken } from '~/src/utils/auth/token'
import { isNull, isNullOrEmptyString } from '~/src/utils/common'
import { toLogin } from '~/src/utils/auth/router'
import { RouteType } from '~/types/router'
import { NOT_FOUND_ROUTE } from '../routes'

const WHITE_LIST = ['/login']

export function createPermissionGurad(router: Router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  router.beforeEach(async to => {
    const token = getToken()

    if (isNullOrEmptyString(token)) {
      if (WHITE_LIST.includes(to.path)) return true

      return { path: 'login', query: { ...to.query, redirect: to.path } }
    }

    if (to.path === '/login') {
      return { path: '/', replace: true }
    }

    if (!isNullOrEmptyString(userStore.userId)) {
      refreshAcessToken()
      return true
    }

    await userStore.getUserInfo().catch(error => {
      removeToken()
      toLogin()
      window.$message?.error(error.message || '获取用户信息失败')
    })

    const accessRoutes = permissionStore.generateRoutes(userStore.role)

    accessRoutes.forEach((route: RouteType) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    router.addRoute(NOT_FOUND_ROUTE)
    return { ...to, replace: true }
  })
}
