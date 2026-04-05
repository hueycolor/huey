import type { Framework } from '@/types'

const FRAMEWORK_STORAGE_KEY = 'huey:framework'
export const FRAMEWORK_CHANGE_EVENT = 'huey:framework-change'

export function getStoredFramework(): Framework {
  if (typeof window === 'undefined')
    return 'vue'

  return (localStorage.getItem(FRAMEWORK_STORAGE_KEY) as Framework) ?? 'vue'
}

export function setStoredFramework(framework: Framework): void {
  localStorage.setItem(FRAMEWORK_STORAGE_KEY, framework)

  window.dispatchEvent(new CustomEvent(FRAMEWORK_CHANGE_EVENT, { detail: { framework } }))
}
