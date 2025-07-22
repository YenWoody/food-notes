<template>
  <header
    class="sticky top-0 z-50 bg-white/90 backdrop-blur transition-all duration-300 shadow"
    :class="isAtTop ? 'py-4 shadow-md' : 'py-2 shadow-sm'"
  >
    <div class="flex items-center justify-between px-4 transition-all duration-300">
      <NuxtLink
        class="font-bold text-orange-600 transition-all duration-300"
        :class="isAtTop ? 'text-2xl' : 'text-lg tracking-wide'"
        to="/"
      >
        🍽 Food Notes
      </NuxtLink>

      <!-- PC menu -->
      <div class="hidden md:block">
        <Nav />
      </div>

      <!-- Mobile menu toggle -->
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden text-2xl transition-transform duration-300"
        :class="{ 'rotate-90': menuOpen }"
      >
        <span v-if="!menuOpen">☰</span>
        <span v-else>✖</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-fade">
      <div
        v-if="menuOpen"
        class="absolute top-full left-0 w-full bg-white shadow-md p-4 z-50 md:hidden"
      >
        <Nav />
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isAtTop = ref(true)
const menuOpen = ref(false)
const handleScroll = () => {
  const scrollY = window.scrollY
  // Chỉ cập nhật nếu có sự thay đổi để tránh flicker
  if (scrollY < 50) {
    isAtTop.value = true
  } else if (scrollY >= 50) {
    isAtTop.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
