import type { RouteType, RoutesType } from '~/types/router'

function hasPermission(route: RouteType, role: string[]) {
  if (!route.meta?.requireAuth) return true

  const routeRole = route.meta?.role ? route.meta.role : []

  if (!role.length || !routeRole.length) {
    return false
  }

  return role.some(item => routeRole.includes(item))
}

export function filterAsyncRoutes(routes: RoutesType = [], role: string[]): RoutesType {
  const ret: RoutesType = []
  routes.forEach(route => {
    if (hasPermission(route, role)) {
      const curRoute: RouteType = {
        ...route,
        children: [],
      }
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role) || []
      } else {
        Reflect.deleteProperty(curRoute, 'children')
      }
      ret.push(curRoute)
    }
  })
  return ret
}
