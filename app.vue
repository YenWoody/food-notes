<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style></style>
<script setup>
import { useAuth } from '~/composables/useAuth'
const { initUser } = useAuth()
onMounted(() => {
  initUser()
})
</script>
