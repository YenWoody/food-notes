<template>
  <nav class="flex flex-col gap-4 md:flex-row gap-2 md:gap-4 text-sm">
    <template v-if="user">
      <!-- Nếu đã đăng nhập -->
      <span class="text-gray-500 text-sm">{{ user.email }}</span>
      <el-button type="danger" size="small" @click="logout">Đăng xuất</el-button>
    </template>

    <template v-else>
      <!-- Nếu chưa đăng nhập -->
      <NuxtLink to="/login">
        <el-button type="primary" size="small">Đăng nhập</el-button>
      </NuxtLink>
      <NuxtLink to="/register">
        <el-button type="default" size="small">Đăng ký</el-button>
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
const { signOut } = useAuth()
const user = useState('user')
const logout = async () => {
  await signOut()
  navigateTo('/login')
}
const emit = defineEmits(['close'])

const onClick = () => {
  emit('close') // dùng để đóng menu trên mobile khi bấm
}
</script>

<style></style>
