<template>
    <el-card class="w-full max-w-md mx-auto mt-10 p-4">
      <h2 class="text-xl font-bold mb-4">Đăng nhập</h2>
  
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Nhập email" />
        </el-form-item>
  
        <el-form-item label="Mật khẩu" prop="password">
          <el-input v-model="form.password" placeholder="Nhập mật khẩu" show-password />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit">Đăng nhập</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { useAuth } from '~/composables/api/useAuth'
  import { useRouter } from 'vue-router'
  
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
  const { signIn } = useAuth()
  const router = useRouter()
  
  const onSubmit = async () => {
    await formRef.value.validate(async (valid: boolean) => {
      if (!valid) return
  
      loading.value = true
      try {
        await signIn(form.email, form.password)
        ElMessage.success('Đăng nhập thành công!')
        router.push('/') // Chuyển hướng về trang chủ sau khi login
      } catch (err: any) {
        ElMessage.error(err.message || 'Đăng nhập thất bại')
      } finally {
        loading.value = false
      }
    })
  }
  </script>
  