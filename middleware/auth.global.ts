import { useAuth } from '~/composables/api/useAuth'
export default defineNuxtRouteMiddleware(async () => {
  const { user, initialized, initAuth } = useAuth()

  if (!initialized.value) {
    await initAuth() // Đảm bảo đã lấy session trước khi check
  }

  if (!user.value) {
    return navigateTo('/login')
  }
})
