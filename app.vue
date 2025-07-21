<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-in-out;
  /* position: absolute; */
  /* width: 100%; */
}

.slide-up-enter-from {
  transform: translateY(10%);
  opacity: 0;
  scale: 0.95;
}
.slide-up-leave-to {
  transform: translateY(-10%);
  opacity: 0;
  scale: 0.95;
}
</style>
<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

const route = useRoute()

useHead(() => {
  const titleMap = {
    '/': 'Trang chủ Nhăm Nhăm',
    '/login': 'Đăng nhập Nhăm Nhăm',
    '/register': 'Đăng ký Nhăm Nhăm',
    '/add-note': 'Thêm món đã nhăm nhăm nào!',
    '/map': 'Bản đồ các quán đã nhăm nhăm!'
  }

  return {
    title: titleMap[route.path] || 'Ứng dụng ghi chú Nhăm Nhăm'
  }
})
</script>
