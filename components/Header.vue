<template>
  <header class="bg-white shadow px-4 py-3 flex items-center justify-between relative">
    <h1 class="text-lg font-bold text-orange-600">🍽 Food Notes</h1>

    <!-- PC menu -->
    <div class="hidden md:block">
      <Nav />
    </div>

    <!-- Mobile menu toggle -->
    <!-- Hamburger toggle -->
    <button
      @click="menuOpen = !menuOpen"
      class="md:hidden text-2xl transition-transform duration-300"
      :class="{ 'rotate-90': menuOpen }"
    >
      <span v-if="!menuOpen">☰</span>
      <span v-else>✖</span>
    </button>

    <!-- Mobile menu -->
    <Transition name="slide-fade">
      <div
        v-if="menuOpen"
        class="absolute top-16 left-0 w-full bg-white shadow-md p-4 z-50 md:hidden transition-all duration-300"
      >
        <Nav @close="menuOpen = false" />
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script setup>
import { ref } from 'vue'
import Nav from '~/components/Nav.vue'

const menuOpen = ref(false)
watch(menuOpen, (e) => {
  console.log(e, 'e')
})
console.log(menuOpen.value, 'test')
</script>
