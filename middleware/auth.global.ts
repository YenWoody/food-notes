export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  const publicPages = ['/login', '/register']
  const isPublicPage = publicPages.includes(to.path)
  console.log(user.value, 'user')
  if (!user.value && !isPublicPage) {
    return navigateTo('/login')
  }
  if (user.value && isPublicPage) {
    return navigateTo('/') // nếu đã login mà vào lại /login thì chuyển về home
  }
})
