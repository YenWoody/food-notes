<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <main class="flex-1 container mx-auto p-4">
      <slot />
      <BottomNav />
    </main>

    <footer class="bg-white text-center p-4 text-sm text-gray-500">
      © {{ new Date().getFullYear() }} Món Ngon Ghi Chú App
    </footer>
  </div>
</template>

<script setup></script>
