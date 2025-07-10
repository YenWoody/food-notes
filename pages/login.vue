<template>
  <div class="hidden md:block">
    <img
      src="/img/backdrop.png"
      alt="Sign in illustration"
      class="w-full max-h-96 object-contain"
    />
  </div>
  <div>
    <h2 class="text-2xl font-bold mb-6">Đăng nhập</h2>

    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="top"
      class="space-y-4"
      @submit.prevent="onLogin"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Nhập email" />
      </el-form-item>

      <el-form-item label="Mật khẩu" prop="password">
        <el-input v-model="form.password" type="password" placeholder="Nhập mật khẩu" />
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="form.remember">Ghi nhớ đăng nhập</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" class="w-full">
          Đăng nhập
        </el-button>
      </el-form-item>

      <div class="flex justify-between text-sm mt-2">
        <NuxtLink to="/register" class="text-blue-500 hover:underline">Tạo tài khoản</NuxtLink>
        <span class="text-gray-400">Hoặc đăng nhập với</span>
      </div>

      <div class="flex gap-2 mt-3">
        <IconMdiAccountCash style="color: green" />
        <el-button circle icon="Twitter" />
        <el-button circle icon="Google" />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useAuth } from '~/composables/useAuth'
const formRef = ref()
const form = reactive({
  email: '',
  password: '',
  remember: true
})
const router = useRouter()
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
const { signIn } = useAuth()

const onLogin = async () => {
  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true
    try {
      console.log(form, 'form')
      await signIn(form.email, form.password)
      ElMessage.success('Đăng nhập thành công!')
      setTimeout(() => {
        return navigateTo('/')
      }, 100)
      // TODO: chuyển trang nếu cần
    } catch (err: any) {
      ElMessage.error(err.message || 'Đăng nhập thất bại')
    } finally {
      loading.value = false
    }
  })
}

definePageMeta({
  layout: 'auth'
})
</script>
