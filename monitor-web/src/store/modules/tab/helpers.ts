import { sStorage } from '~/src/utils/cache'

export const activeTab = sStorage.get('activeTab')
export const tabs = sStorage.get('tabs')

export const WITHOUT_TAB_PATHS = ['/404', '/login']
