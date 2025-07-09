import { useState } from '#app'
import type { User } from '@supabase/supabase-js'
export const useAuth = () => {
const user = useState<User | null>('user', () => null)

  const { $supabase } = useNuxtApp()

  const fetchUser = async () => {
    const { data } = await $supabase.auth.getUser()
    user.value = data.user
  }

  const signUp = async (email: string, password: string) => {
    const { data, error } = await $supabase.auth.signUp({ email, password })
    if (error) throw error
    user.value = data.user
    return data
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await $supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    return data
  }

  const signOut = async () => {
    const { error } = await $supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  return {
    user,
    fetchUser,
    signUp,
    signIn,
    signOut
  }
}
