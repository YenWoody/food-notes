<template>
  <div class="min-h-screen flex flex-col bg-white" v-loading="loading">
    <Header />

    <main class="flex-1 container mx-auto p-2">
      <slot />
      <BottomNav />
    </main>

    <footer class="bg-white text-center p-4 text-sm text-gray-500">
      © {{ new Date().getFullYear() }} Món Ngon Ghi Chú App
    </footer>
  </div>
</template>

<script setup>
const loading = useState('loading_user')
</script>
