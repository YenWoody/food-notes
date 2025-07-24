<template>
  <nav
    class="flex justify-between px-4 py-2 border-t border-gray-200 bg-white shadow-md fixed bottom-0 left-0 right-0 z-50"
  >
    <!-- Nút Danh sách -->
    <NuxtLink
      to="/"
      class="flex flex-col items-center justify-center w-1/3 text-gray-700 hover:text-orange-500"
    >
      <IconMdiClipboardList class="w-6 h-6" />
      <span class="text-base">Danh sách</span>
    </NuxtLink>

    <!-- Nút Thêm (nổi ở giữa) -->
    <div class="relative w-1/3 flex justify-center">
      <NuxtLink
        to="/add-note"
        class="absolute -top-6 bg-white rounded-full shadow-lg p-2 text-gray-700 hover:text-orange-500 transition"
      >
        <IconMdiPlusCircle class="w-10 h-10" />
      </NuxtLink>
    </div>

    <!-- Nút Bản đồ -->
    <NuxtLink
      to="/map"
      class="flex flex-col items-center justify-center w-1/3 text-gray-700 hover:text-orange-500"
    >
      <IconMdiMap class="w-6 h-6" />
      <span class="text-base">Bản đồ</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import IconMdiClipboardList from '~icons/mdi/clipboard-list'
import IconMdiPlusCircle from '~icons/mdi/plus-circle'
import IconMdiMap from '~icons/mdi/map'
</script>
