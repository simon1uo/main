<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { useECharts } from '@/hooks/web/useECharts'
import { basicProps } from './props'

const props = defineProps(basicProps)
const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

onMounted(() => {
  setOptions({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          width: 1,
          color: '#019680',
        },
      },
    },
    grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  })
})
</script>

<style scoped></style>
