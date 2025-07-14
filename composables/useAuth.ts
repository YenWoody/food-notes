import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

const supabaseClient = () => {
  const config = useRuntimeConfig()
  return createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
}

export const useAuth = () => {
  const supabase = supabaseClient()
  const user = useState<User | null>('user', () => null)
  const loadingUser = useState('loading_user', () => false)
  const fetchUser = async () => {
    loadingUser.value = true
    const { data, error } = await supabase.auth.getUser()
    if (data?.user) {
      user.value = data.user
    } else {
      user.value = null
    }
    loadingUser.value = false
    return user.value
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    user.value = data.user

    return data
  }

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    user.value = data.user

    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }
  // Cập nhật trạng thái khi Supabase refresh token hoặc sign in/out
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      user.value = session.user
    } else {
      user.value = null
    }
  })

  return { user, fetchUser, signIn, signUp, signOut, supabase }
}
