import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

const supabaseClient = () => {
  const config = useRuntimeConfig()
  return createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
}

export const useAuth = () => {
  const supabase = supabaseClient()
  const user = useState<User | null>('user', () => null)
  const loading = useState('auth_loading', () => false)

  // Gọi khi app mounted để kiểm tra user
  const initUser = async () => {
    if (user.value) return
    const { data, error } = await supabase.auth.getUser()
    user.value = data?.user ?? null
  }

  const signUp = async (email: string, password: string) => {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({ email, password })
    loading.value = false
    if (error) throw error
    user.value = data.user
    return data
  }

  const signIn = async (email: string, password: string) => {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    loading.value = false
    if (error) throw error
    user.value = data.user
    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  // Lắng nghe session (token hết hạn hoặc đăng xuất từ tab khác)
  if (process.client) {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        user.value = null
      } else {
        user.value = session.user
      }
    })
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    initUser
  }
}
