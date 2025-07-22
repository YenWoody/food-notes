<template>
  <el-card class="max-w-xl mx-auto p-6">
    <template #header>
      <h1 class="text-xl font-bold text-center">Chi tiết món ăn</h1>
    </template>

    <div v-if="note">
      <el-image
        v-if="note.image_url"
        :src="note.image_url"
        fit="cover"
        class="w-full h-48 rounded mb-4"
      />

      <el-input v-model="note.title" placeholder="Tên món" class="mb-3" clearable />

      <el-input
        type="textarea"
        v-model="note.description"
        placeholder="Mô tả"
        :rows="4"
        class="mb-3"
        resize="none"
        clearable
      />
      <el-form-item label="Địa điểm">
        <AddressInput v-model:location="location" />
      </el-form-item>

      <el-form-item label="Đánh giá">
        <el-rate
          v-model="note.rating"
          :max="5"
          show-score
          allow-half
          :score-template="`${note.rating} sao - ${getRatingText(note.rating) || ''}`"
        />
      </el-form-item>
      <div class="flex">
        <el-button
          type="danger"
          @click="deleteNote"
          class="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Xóa ghi chú
        </el-button>
        <el-button type="primary" class="w-full" @click="updateNote"> Lưu thay đổi </el-button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-6">Đang tải ghi chú...</div>
  </el-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { ElMessage, ElMessageBox } from 'element-plus'
const { supabase } = useAuth()

const route = useRoute()
const router = useRouter()
const noteId = route.params.id
const note = ref<any>(null)
const location = computed({
  get: () => ({
    name: note.value?.location_name ?? '',
    lat: note.value?.location_coords?.[1] ?? null,
    lng: note.value?.location_coords?.[0] ?? null
  }),
  set: (val) => {
    note.value.location_name = val.name
    note.value.location_coords = [val.lng, val.lat]
  }
})
watch(location, (e) => {
  console.log(e)
})
onMounted(async () => {
  const { data, error } = await supabase.from('food_notes').select('*').eq('id', noteId).single()

  if (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
  } else {
    note.value = data
    console.log(note.value)
  }
})
const getRatingText = (value: number) => {
  if (value <= 1.5) return 'Dở tệ'
  if (value <= 2.5) return 'Không ngon'
  if (value <= 3.5) return 'Tạm được'
  if (value <= 4.5) return 'Ngon'
  return 'Xuất sắc'
}
const updateNote = async () => {
  if (!note.value) return
  const { id, ...fieldsToUpdate } = note.value
  const { error } = await supabase.from('food_notes').update(fieldsToUpdate).eq('id', id)

  if (error) {
    console.error('Lỗi cập nhật:', error)
  } else {
    ElMessage.success('Đã lưu thành công!')
    router.push('/')
  }
}
async function deleteNote() {
  try {
    await ElMessageBox.confirm('Bạn có chắc chắn muốn xóa ghi chú này không?', 'Xác nhận xóa', {
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      type: 'warning'
    })

    const { error } = await supabase.from('food_notes').delete().eq('id', noteId)
    if (error) throw error

    ElMessage.success('Đã xóa ghi chú.')
    router.push('/')
  } catch (err: any) {
    if (err === 'cancel' || err === 'close') {
      // Người dùng bấm Hủy
      return
    }
    ElMessage.error('Lỗi khi xóa: ' + (err.message || err))
  }
}
</script>
