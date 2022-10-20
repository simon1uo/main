import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './pageLoading'
import { createPageTitleGurad } from './pageTitle'
import { createPermissionGurad } from './permission'

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router)
  createPageTitleGurad(router)
  createPermissionGurad(router)
}
