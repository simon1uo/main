<script setup lang="ts">
import { useRoute } from 'vue-router'
import Footer from '../Footer/index.vue'

defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
})
const route = useRoute()
</script>

<template>
  <div>
    <section class="cus-scroll-y wh-full p-15 flex-col">
      <header v-if="showHeader" px-15 mb-15 min-h-45 flex justify-between items-center>
        <slot v-if="$slots.header" name="header" />
        <template v-else>
          <h2 text-22 fw-500>{{ title || route.meta?.title }}</h2>
          <slot name="action" />
        </template>
      </header>

      <div flex-1>
        <slot />
      </div>
    </section>
    <Footer v-if="showFooter" />
  </div>
</template>
