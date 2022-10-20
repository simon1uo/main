<template>
  <div h-full flex-col overflow-auto bg-light>
    <div ma w-500 flex-col items-start border card-shadow border-gray-300 p-30 rounded-10>
      <h5 text-30 font-bold color="#6a6a6a" flex items-center>
        <icon-custom-logo w-50 h-50 text-35 mr-10 /> 登录 <span op-60> / {{ title }} </span>
      </h5>
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.name"
          autofocus
          class="text-16 items-center h-50 pl-10"
          placeholder="admin"
          :maxlength="20"
        >
        </n-input>
      </div>
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.password"
          class="text-16 items-center h-50 pl-10"
          type="password"
          show-password-on="mousedown"
          placeholder="123456"
          :maxlength="20"
          @keydown.enter="handleLogin"
        />
      </div>

      <div mt-20 w-full>
        <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="(val: boolean) => (isRemember = val)" />
      </div>

      <div mt-20 w-full>
        <n-button w-full h-50 rounded-5 text-16 type="primary" @click="handleLogin">登录</n-button>
      </div>
    </div>
    <Footer my-30 />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { lStorage } from '@/utils/cache'
import { setToken } from '@/utils/auth/token'
import Footer from '~/src/layout/Footer/index.vue'

const title = import.meta.env.VITE_APP_TITLE

const router = useRouter()
const route = useRoute()
const query = route.query

const loginInfo = ref({
  name: '',
  password: '',
})

const initLoginInfo = () => {
  const localLoginInfo = lStorage.get('loginInfo')

  if (localLoginInfo) {
    loginInfo.value.name = localLoginInfo.name || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}
initLoginInfo()

const isRemember = ref(false)

const handleRememberInfo = (isRemember: boolean) => {
  if (isRemember) {
    lStorage.setItem('loginInfo', { name: loginInfo.value.name, password: loginInfo.value.password })
  } else {
    lStorage.removeItem('loginInfo')
  }
}

const handleLogin = async () => {
  const { name, password } = loginInfo.value
  if (!name || !password) {
    window.$message?.warning('请输入用户名和密码')
    return
  }

  try {
    const res: any = await api.auth.login({ name, password: password.toString() })
    if (res.code === 0) {
      window.$notification?.success({ title: '登录成功', duration: 2500 })
      setToken(res.data.token)
      handleRememberInfo(isRemember.value)

      if (query.redirect) {
        const path = query.redirect as string
        Reflect.deleteProperty(query, 'redirect')
        router.push({ path, query })
      } else {
        router.push('/')
      }
    } else {
      window.$message?.warning(res.message)
    }
  } catch (error: any) {
    window.$message?.error(error.message)
  }
}
</script>

<style lang="scss" scoped></style>
