<template>
  <div class="px-4 py-6 max-w-full sm:max-w-2xl mx-auto space-y-4">
    <h1 class="text-xl font-bold text-center text-indigo-600">🍽️ Danh sách món ăn đã lưu</h1>

    <div v-if="notes.length === 0" class="text-center text-gray-500">Chưa có ghi chú nào.</div>
    <div class="" v-loading="loading">
      <NuxtLink
        v-for="note in notes"
        :key="note.id"
        :to="`/note/${note.id}`"
        class="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out hover:scale-102"
      >
        <img
          v-if="note.image_url"
          :src="note.image_url"
          class="w-auto h-48 object-cover rounded-xl mx-auto"
        />

        <div class="p-4 space-y-2">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-800">{{ note.title }}</h2>
            <el-rate
              v-model="note.rating"
              :max="5"
              disabled
              allow-half
              show-score
              class="text-sm"
            />
          </div>

          <p class="text-gray-600 text-sm line-clamp-3">{{ note.description }}</p>

          <div class="text-sm text-gray-500">📍 {{ note.location_name }}</div>

          <div class="flex flex-wrap gap-1 text-xs mt-1">
            <span
              v-for="tag in note.tags"
              :key="tag"
              class="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { ElRate } from 'element-plus'
import type { User } from '@supabase/supabase-js'
const { supabase, fetchUser } = useAuth()
const notes = ref<any[]>([])
const user = useState<User | null>('user')
const loading = ref(true)

async function loadNotes() {
  if (!user.value) await fetchUser()
  if (!user.value) navigateTo('/login')
  loading.value = true
  const { data, error } = await supabase
    .from('food_notes')
    .select('*')
    .eq('user_id', user.value?.id)
    .order('created_at', { ascending: false })
  console.log(notes.value, 'notes')
  if (!error) {
    notes.value = data || []
  } else {
    console.error('Lỗi khi fetch notes:', error)
  }
  if (notes.value.length > 0) {
    loading.value = false
  }
}
onMounted(() => {
  loadNotes()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
