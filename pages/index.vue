<template>
  <div class="space-y-4">
    <div v-for="item in foods" :key="item.id" class="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <h2 class="text-lg font-semibold text-orange-600">{{ item.dish }}</h2>
        <p class="text-sm text-gray-600">📍 {{ item.place }}</p>
        <p class="text-sm mt-1">{{ item.note }}</p>
      </div>
      <NuxtLink
        :to="`/map?id=${item.id}`"
        class="text-sm text-blue-600 hover:underline"
      >
        Xem bản đồ
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const foods = ref([
  { id: 1, dish: 'Bún bò thập cẩm', place: 'Quán Bún Chị Ba', note: 'Lần trước hơi mặn' },
  { id: 2, dish: 'Phở tái gầu', place: 'Phở Lý Quốc Sư', note: 'Ăn ổn, nhiều thịt' },
  // sau này thay bằng dữ liệu từ Supabase
])
</script>
