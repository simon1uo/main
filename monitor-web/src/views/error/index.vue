<script setup lang="ts">
import Page from '@/layout/Page/index.vue'
import Lcp from './components/Lcp.vue'
import { onMounted, ref } from 'vue'
import api from '@/api'

const loading = ref(true)
const jsErrorData = ref<any>({})
const runtime = ref<any>({})
const promise = ref<any>({})
const resource = ref<any>({})

onMounted(async () => {
  const monitorJsErrorData: any = (await api.monitor.getJsErrorData()).data
  jsErrorData.value = monitorJsErrorData
  runtime.value = jsErrorData.value.runtime
  promise.value = jsErrorData.value.promise
  resource.value = jsErrorData.value.resource

  loading.value = false
})
</script>

<template>
  <Page>
    <n-grid cols="3" responsive="screen" :x-gap="8" :y-gap="10">
      <n-grid-item>
        <NCard
          title="JavaScript 运行时错误"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="runtime.amount" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="runtime.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="runtime.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="runtime.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="JavaScript 资源加载异常"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="resource.amount" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="resource.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="resource.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="resource.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard
          title="JavaScript Promise 异常"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="promise.amount" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="promise.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="promise.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="promise.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
    </n-grid>

    <n-grid cols="3" responsive="screen" :x-gap="8" :y-gap="10">
      <n-grid-item>
        <n-card>
          <Lcp></Lcp>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card>
          <Lcp></Lcp>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card>
          <Lcp></Lcp>
        </n-card>
      </n-grid-item>
    </n-grid>
  </Page>
</template>

<style scoped></style>
