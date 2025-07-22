<template>
  <div>
    <div class="md:order-2">
      <h2 class="text-2xl font-bold mb-6">Đăng ký tài khoản</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="space-y-4">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Nhập email" />
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <el-input v-model="form.password" placeholder="Nhập mật khẩu" show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit" class="w-full">
            Đăng ký
          </el-button>
        </el-form-item>

        <p class="text-sm text-right">
          <NuxtLink to="/login" class="text-gray-500 hover:text-blue-600"
            >Đã có tài khoản?</NuxtLink
          >
        </p>
      </el-form>
    </div>

    <div class="hidden md:block">
      <img src="/img/backdrop.png" alt="Sign up" class="w-full max-h-96 object-contain" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useAuth } from '~/composables/useAuth'

const formRef = ref()
const form = reactive({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 6, message: 'Mật khẩu phải từ 6 ký tự', trigger: 'blur' }
  ]
}

const loading = ref(false)
const { signUp } = useAuth()

const onSubmit = async () => {
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true
    try {
      await signUp(form.email, form.password)
      ElMessage.success('Đăng ký thành công!')
      setTimeout(() => {
        return navigateTo('/login')
      }, 100)
    } catch (err: any) {
      ElMessage.error(err.message || 'Đăng ký thất bại')
    } finally {
      loading.value = false
    }
  })
}

definePageMeta({
  layout: 'auth'
})
</script>
