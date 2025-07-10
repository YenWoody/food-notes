<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 flex justify-around py-2"
  >
    <NuxtLink
      to="/"
      class="flex flex-col items-center text-gray-700 hover:text-orange-500 transition"
      @click="onClick"
    >
      <IconMdiClipboardList class="w-6 h-6" />
      <span class="text-xs">Danh sách</span>
    </NuxtLink>

    <NuxtLink
      to="/add"
      class="flex flex-col items-center text-gray-700 hover:text-orange-500 transition"
      @click="onClick"
    >
      <IconMdiPlusCircle class="w-6 h-6" />
      <span class="text-xs">Thêm món</span>
    </NuxtLink>

    <NuxtLink
      to="/map"
      class="flex flex-col items-center text-gray-700 hover:text-orange-500 transition"
      @click="onClick"
    >
      <IconMdiMap class="w-6 h-6" />
      <span class="text-xs">Bản đồ</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import IconMdiClipboardList from '~icons/mdi/clipboard-list'
import IconMdiPlusCircle from '~icons/mdi/plus-circle'
import IconMdiMap from '~icons/mdi/map'
defineProps<{
  onClick?: () => void
}>()
</script>
