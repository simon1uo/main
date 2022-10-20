import { defineStore } from 'pinia'
import api from '@/api'
import { removeToken } from '@/utils/auth/token'
import { toLogin } from '@/utils/auth/router'

interface UserInfo {
  id?: string
  name?: string
  avatar?: string
  role?: Array<string>
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo>{},
    }
  },

  getters: {
    userId(): string {
      return this.userInfo.id || ''
    },
    name(): string {
      return this.userInfo.name || ''
    },
    avatar(): string {
      return this.userInfo.avatar || ''
    },
    role(): Array<string> {
      return this.userInfo.role || []
    },
  },

  actions: {
    async getUserInfo() {
      try {
        const res: any = await api.user.getUser()
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      removeToken()
      this.userInfo = {}
      window.$message?.success('退出登录成功')
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
