<script setup lang="ts">
import Page from '~/src/layout/Page/index.vue'
import Lcp from './components/Lcp.vue'

import { onMounted, ref } from 'vue'
import api from '@/api'

const loading = ref(true)
const monitorPerformanceData = ref<any>({})
const ttfbData = ref<any>({})
const domData = ref<any>({})
const loadData = ref<any>({})

onMounted(async () => {
  const monitorJsErrorData: any = (await api.monitor.getPerformanceData()).data
  ttfbData.value = monitorJsErrorData.ttfb
  domData.value = monitorJsErrorData.dom
  loadData.value = monitorJsErrorData.load

  loading.value = false
})
</script>

<template>
  <div>
    <Page>
      <n-grid cols="3" responsive="screen" :x-gap="8" :y-gap="10">
        <n-grid-item>
          <NCard title="TTFB 平均时间" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <div class="py-1 px-1 flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else class="text-9xl" :startVal="1" :endVal="ttfbData" suffix="ms" />
            </div>
          </NCard>
        </n-grid-item>
        <n-grid-item>
          <NCard title="DOM 解析时间" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <div class="py-1 px-1 flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else class="text-9xl" :startVal="1" :endVal="domData" suffix="ms" />
            </div>
          </NCard>
        </n-grid-item>
        <n-grid-item>
          <NCard title="加载时间" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <div class="py-1 px-1 flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else class="text-9xl" :startVal="1" :endVal="loadData" suffix="ms" />
            </div>
          </NCard>
        </n-grid-item>
      </n-grid>
      <n-grid cols="3" responsive="screen" :x-gap="8" :y-gap="10">
        <n-grid-item>
          <n-card title="LCP">
            <Lcp></Lcp>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="LCP">
            <Lcp></Lcp>
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="FCP">
            <Lcp></Lcp>
          </n-card>
        </n-grid-item> </n-grid
    ></Page>
  </div>
</template>

<style scoped></style>
