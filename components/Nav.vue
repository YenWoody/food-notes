<template>
  <nav class="flex flex-col md:flex-row gap-2 md:gap-4 text-sm">
    <NuxtLink to="/" class="text-gray-700 hover:text-orange-500 transition" @click="onClick">📋 Danh sách</NuxtLink>
    <NuxtLink to="/add" class="text-gray-700 hover:text-orange-500 transition" @click="onClick">➕ Thêm món</NuxtLink>
    <NuxtLink to="/map" class="text-gray-700 hover:text-orange-500 transition" @click="onClick">🗺 Bản đồ</NuxtLink>
  </nav>
</template>

<script setup>
const emit = defineEmits(['close'])

const onClick = () => {
  emit('close') // dùng để đóng menu trên mobile khi bấm
}
</script>

<style>
</style>
