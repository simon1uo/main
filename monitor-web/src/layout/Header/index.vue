<script setup lang="ts">
import MenuCollapse from './components/MenuCollapse.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import UserAvatar from './components/UserAvatar.vue'
import ThemeMode from './components/ThemeMode.vue'
import FullScreen from './components/FullScreen.vue'
</script>

<template>
  <div flex items-center>
    <MenuCollapse />
    <BreadCrumb />
  </div>
  <div ml-auto>
    <n-space items-center>
      <FullScreen />
      <ThemeMode />
      <UserAvatar />
    </n-space>
  </div>
</template>

<style scoped></style>
