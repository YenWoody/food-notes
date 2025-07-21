<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50 flex justify-around py-2"
  >
    <!-- Nút Danh sách -->
    <NuxtLink
      to="/"
      class="flex flex-col items-center text-gray-700 hover:text-orange-500 transition"
    >
      <IconMdiClipboardList class="w-6 h-6" />
      <span class="text-base">Danh sách</span>
    </NuxtLink>

    <!-- Nút Bản đồ -->
    <NuxtLink
      to="/map"
      class="flex flex-col items-center text-gray-700 hover:text-orange-500 transition"
    >
      <IconMdiMap class="w-6 h-6" />
      <span class="text-base">Bản đồ</span>
    </NuxtLink>

    <!-- Nút Thêm món (nổi ở giữa và cao hơn) -->
    <NuxtLink
      to="/add-note"
      class="absolute -top-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-700 hover:text-orange-500 transition bg-white rounded-full shadow-lg p-2"
    >
      <IconMdiPlusCircle class="w-10 h-10" />
      <span class="text-sm mt-1">Thêm món</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import IconMdiClipboardList from '~icons/mdi/clipboard-list'
import IconMdiPlusCircle from '~icons/mdi/plus-circle'
import IconMdiMap from '~icons/mdi/map'
</script>
