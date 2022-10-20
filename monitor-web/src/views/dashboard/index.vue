<script setup lang="ts">
import Page from '@/layout/Page/index.vue'
import CountTo from '@/components/util/CountTo/index.vue'

import api from '@/api'
import { onMounted, ref } from 'vue'
import VisitTab from './components/VisitTab.vue'

const loading = ref(true)
const flowData = ref<any>({})
const flowTrendencyData = ref<any>({})

onMounted(async () => {
  const previewFlowData: any = (await api.dashborad.getPreviewFlowData()).data
  const previewFlowTrendencyData: any = (await api.dashborad.getPreviewFlowTrendencyData()).data

  flowData.value = previewFlowData
  flowTrendencyData.value = previewFlowTrendencyData
  console.log(flowTrendencyData)

  loading.value = false
})
</script>

<template>
  <Page :show-footer="true">
    <n-grid cols="1 s:2 m:3 l:6 xl:6 2xl:6" responsive="screen" :x-gap="8" :y-gap="8">
      <n-grid-item>
        <NCard title="访问量(UV)" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="flowData.UV" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="flowTrendencyData.UV.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="flowTrendencyData.UV.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="flowTrendencyData.UV.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard title="浏览量(PV)" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="flowData.PGV" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="flowTrendencyData.PV.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="flowTrendencyData.PV.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="flowTrendencyData.PV.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard title="新访客数" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="flowData.newVistor" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="flowTrendencyData.newVistor.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="flowTrendencyData.newVistor.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="flowTrendencyData.newVistor.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard title="IP数" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="flowData.ipTotal" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="flowTrendencyData.ipTotal.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="flowTrendencyData.ipTotal.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="flowTrendencyData.ipTotal.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard title="频次" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="flowData.FPP" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="flowTrendencyData.FPP.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="flowTrendencyData.FPP.type === 'up'" />
                  <icon:ion:caret-down-outline class="color-green" v-if="flowTrendencyData.FPP.type === 'down'" />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
      <n-grid-item>
        <NCard title="跳出率" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="py-1 px-1 flex justify-between">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <CountTo v-else class="text-9xl" :startVal="1" :endVal="Math.round(flowData.jumpOutRate)" />
          </div>
          <div class="py-1 px-1 flex justify-between">
            <div class="text-sn">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <CountTo :startVal="1" suffix="%" :endVal="flowTrendencyData.jumpOutRate.rate" />
                <n-icon size="12">
                  <icon:ion:caret-up-outline class="color-red" v-if="flowTrendencyData.jumpOutRate.type === 'up'" />
                  <icon:ion:caret-down-outline
                    class="color-green"
                    v-if="flowTrendencyData.jumpOutRate.type === 'down'"
                  />
                </n-icon>
              </template>
            </div>
          </div>
        </NCard>
      </n-grid-item>
    </n-grid>

    <VisitTab />
  </Page>
</template>
