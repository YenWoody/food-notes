<template>
  <div
    class="px-4 py-6 space-y-6 max-w-full sm:max-w-md mx-auto bg-white rounded-t-3xl shadow-lg min-h-screen"
  >
    <h1 class="text-xl font-bold text-center text-indigo-600">📝 Thêm Ghi Chú Món Ăn</h1>

    <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="space-y-4">
      <el-form-item label="Tên món ăn" prop="title">
        <el-input v-model="form.title" placeholder="Nhập tên món ăn" clearable size="large" />
      </el-form-item>

      <el-form-item label="Mô tả" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="Nhập mô tả"
          autosize
          clearable
          size="large"
        />
      </el-form-item>

      <el-form-item label="Ảnh minh họa">
        <input type="file" accept="image/*" @change="onSelectFile" class="text-sm" />
        <div v-if="previewUrl" class="mt-3">
          <img
            :src="previewUrl"
            alt="Xem trước ảnh"
            class="w-full max-w-xs rounded-xl border shadow-md mx-auto"
          />
        </div>
      </el-form-item>

      <el-form-item label="Đánh giá">
        <el-rate
          v-model="form.rating"
          :max="5"
          show-score
          allow-half
          :score-template="`${form.rating} sao - ${getRatingText(form.rating) || ''}`"
        />
      </el-form-item>

      <el-form-item label="Địa điểm" prop="locationName">
        <AddressInput v-model:location="location" />
      </el-form-item>

      <!-- <el-form-item label="Tọa độ (Lng, Lat)">
        <div class="flex flex-col sm:flex-row gap-3">
          <el-input
            v-model.number="form.locationCoords[0]"
            placeholder="Lng"
            clearable
            size="large"
          />
          <el-input
            v-model.number="form.locationCoords[1]"
            placeholder="Lat"
            clearable
            size="large"
          />
        </div>
      </el-form-item> -->

      <el-form-item label="Tags (nhập và nhấn dấu phẩy hoặc Enter)">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          collapse-tags
          size="large"
          placeholder="Nhập tag..."
          :reserve-keyword="false"
          @input.native="handleSelectInput"
          ref="tagSelectRef"
        >
          <el-option v-for="tag in form.tags" :key="tag" :label="tag" :value="tag" />
        </el-select>
      </el-form-item>

      <el-tooltip content="Yêu thích" placement="top">
        <el-button
          :type="form.isFavorite ? 'danger' : 'default'"
          circle
          @click="form.isFavorite = !form.isFavorite"
        >
          <MdiLike />
        </el-button>
      </el-tooltip>

      <el-form-item>
        <el-button type="primary" @click="addNote" :loading="isSaving" class="w-full" size="large">
          Lưu ghi chú
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
</style>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useAuth } from '~/composables/useAuth'
import MdiLike from '~icons/mdi/like'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElRate,
  ElMessage,
  ElSelect,
  ElOption
} from 'element-plus'
import type { InputInstance } from 'element-plus'
const { supabase, fetchUser } = useAuth()

const form = ref({
  title: '',
  description: '',
  rating: 5,
  locationName: '',
  locationCoords: [0, 0] as [number, number],
  tags: [] as string[],
  isFavorite: false
})
const location = computed({
  get: () => ({
    name: form.value?.locationName ?? '',
    lat: form.value?.locationCoords?.[1] ?? null,
    lng: form.value?.locationCoords?.[0] ?? null
  }),
  set: (val) => {
    form.value.locationName = val.name
    form.value.locationCoords = [val.lng, val.lat]
  }
})
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isSaving = ref(false)
const success = ref(false)
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const tagSelectRef = ref<InputInstance>()

const rules = {
  title: [{ required: true, message: 'Tên món ăn là bắt buộc', trigger: 'blur' }],
  description: [{ required: true, message: 'Mô tả là bắt buộc', trigger: 'blur' }],
  locationName: [{ required: true, message: 'Địa điểm là bắt buộc', trigger: 'blur' }]
}

const getRatingText = (value: number) => {
  if (value <= 1.5) return 'Dở tệ'
  if (value <= 2.5) return 'Không ngon'
  if (value <= 3.5) return 'Tạm được'
  if (value <= 4.5) return 'Ngon'
  return 'Xuất sắc'
}

const onSelectFile = (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0]
  if (!file) return
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}
const onAddressSelected = (payload: { name: string; lat: number; lng: number }) => {
  form.value.locationName = payload.name
  form.value.locationCoords = [payload.lng, payload.lat]
}
const handleSelectInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const value = input.value
  if (value.includes(',')) {
    const tags = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    tags.forEach((tag) => {
      if (!form.value.tags.includes(tag)) {
        form.value.tags.push(tag)
      }
    })
    input.value = ' '
    nextTick(() => {
      input.value = ''
      if (tagSelectRef.value?.input) tagSelectRef.value.input.value = ''
    })
  }
}

const addNote = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    const user = await fetchUser()
    if (!user) {
      ElMessage.error('Bạn chưa đăng nhập!')
      return
    }

    isSaving.value = true
    let finalImageUrl = ''

    if (selectedFile.value) {
      const file = selectedFile.value
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`
      const filePath = `${user.id}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('food-images')
        .upload(filePath, file)

      if (uploadError) {
        ElMessage.error('Lỗi upload ảnh: ' + uploadError.message)
        isSaving.value = false
        return
      }

      const { data: urlData } = supabase.storage.from('food-images').getPublicUrl(filePath)
      finalImageUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('food_notes').insert([
      {
        user_id: user.id,
        title: form.value.title,
        description: form.value.description,
        image_url: finalImageUrl,
        rating: form.value.rating,
        location_name: form.value.locationName,
        location_coords: form.value.locationCoords,
        tags: form.value.tags,
        is_favorite: form.value.isFavorite
      }
    ])

    isSaving.value = false

    if (error) {
      ElMessage.error('Lỗi khi lưu ghi chú: ' + error.message)
      return
    }

    success.value = true
    form.value = {
      title: '',
      description: '',
      rating: 5,
      locationName: '',
      locationCoords: [0, 0],
      tags: [],
      isFavorite: false
    }
    selectedFile.value = null
    previewUrl.value = null
    ElMessage.success('✅ Đã lưu ghi chú thành công!')
  })
}
</script>
