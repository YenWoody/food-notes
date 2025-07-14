<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    <el-icon class="animate-spin" size="48"><Loading /></el-icon>
  </div>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
