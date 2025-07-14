// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ['/login', '/register']
  const isPublic = publicPages.includes(to.path)

  const { user, fetchUser } = useAuth()

  // Đợi user được fetch từ getUser()
  if (!user.value) await fetchUser()

  if (!user.value && !isPublic) {
    return navigateTo('/login')
  }

  if (user.value && isPublic) {
    return navigateTo('/')
  }
})
